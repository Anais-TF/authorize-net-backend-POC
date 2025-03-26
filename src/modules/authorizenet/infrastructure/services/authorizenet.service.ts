import { PaymentDto } from '@modules/authorizenet/presentation/dtos';
import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IAuthorizenetConfig } from '@src/config';
import { APIContracts, APIControllers } from 'authorizenet';
import { Observable, catchError, firstValueFrom } from 'rxjs';
import MerchantAuthenticationType = APIContracts.MerchantAuthenticationType;

// TODO: move to utils
function executeTransaction(ctrl: APIControllers.CreateTransactionController): Observable<any>
{
    return new Observable(observer =>
    {
        ctrl.execute(() =>
        {
            const apiResponse = ctrl.getResponse();
            if (!apiResponse)
            {
                observer.error(ctrl.getError());
            }
            else
            {
                observer.next(new APIContracts.CreateTransactionResponse(apiResponse));
                observer.complete();
            }
        });
    });
}

@Injectable()
export class AuthorizenetService
{
    private readonly logger = new Logger(AuthorizenetService.name);
    private readonly merchantAuthenticationType: MerchantAuthenticationType;

    constructor(
        private readonly configService: ConfigService,
        private readonly httpService: HttpService
    )
    {
        const config = this.configService.get<IAuthorizenetConfig>('authorizenet');
        this.merchantAuthenticationType = new APIContracts.MerchantAuthenticationType();
        this.merchantAuthenticationType.setName(config.apiLoginKey);
        this.merchantAuthenticationType.setTransactionKey(config.transactionKey);
    }

    async chargeCreditCard({ paymentInfo, order, billingInfo, shippingAddress }: PaymentDto)
    {
        const creditCard = new APIContracts.CreditCardType();
        creditCard.setCardNumber(paymentInfo.creditCardNumber);
        creditCard.setExpirationDate(paymentInfo.expireDate);
        creditCard.setCardCode(paymentInfo.cvv);

        const paymentType = new APIContracts.PaymentType();
        paymentType.setCreditCard(creditCard);

        const orderDetails = new APIContracts.OrderType();
        orderDetails.setInvoiceNumber(order.number);
        orderDetails.setDescription(order?.description ?? 'default_description');

        const orderItems = order.items.map((item) =>
        {
            const lineItem = new APIContracts.LineItemType();
            lineItem.setItemId(item.id);
            lineItem.setName(item.name);
            lineItem.setDescription(item.description);
            lineItem.setQuantity(item.quantity);
            lineItem.setUnitPrice(item.price);

            return lineItem;
        });

        const lineItems = new APIContracts.ArrayOfLineItem();
        lineItems.setLineItem(orderItems);

        const tax = new APIContracts.ExtendedAmountType();
        tax.setAmount(order.tax);
        tax.setName('default_name');
        tax.setDescription('default_description');

        const billTo = new APIContracts.CustomerAddressType();
        billTo.setFirstName(billingInfo.firstName);
        billTo.setLastName(billingInfo.lastName);
        billTo.setCompany(billingInfo.company);
        billTo.setAddress(billingInfo.address);
        billTo.setCity(billingInfo.city);
        billTo.setState(billingInfo.state);
        billTo.setZip(billingInfo.zip);
        billTo.setCountry(billingInfo.country);

        const shipTo = new APIContracts.CustomerAddressType();
        shipTo.setFirstName(shippingAddress.firstName);
        shipTo.setLastName(shippingAddress.lastName);
        shipTo.setCompany(shippingAddress.company);
        shipTo.setAddress(shippingAddress.address);
        shipTo.setCity(shippingAddress.city);
        shipTo.setState(shippingAddress.state);
        shipTo.setZip(shippingAddress.zip);
        shipTo.setCountry(shippingAddress.country);

        const transactionSetting1 = new APIContracts.SettingType();
        transactionSetting1.setSettingName('duplicateWindow');
        transactionSetting1.setSettingValue('120');

        const transactionSetting2 = new APIContracts.SettingType();
        transactionSetting2.setSettingName('recurringBilling');
        transactionSetting2.setSettingValue('false');

        const transactionSettings = new APIContracts.ArrayOfSetting();
        transactionSettings.setSetting([transactionSetting1, transactionSetting2]);

        const transactionRequestType = new APIContracts.TransactionRequestType();
        transactionRequestType.setTransactionType(APIContracts.TransactionTypeEnum.AUTHONLYTRANSACTION);
        transactionRequestType.setPayment(paymentType);
        transactionRequestType.setAmount(order.total);
        transactionRequestType.setLineItems(lineItems);
        // transactionRequestType.setUserFields(userFields);
        transactionRequestType.setOrder(orderDetails);
        transactionRequestType.setTax(tax);
        // transactionRequestType.setDuty(duty);
        // transactionRequestType.setShipping(shipping);
        transactionRequestType.setBillTo(billTo);
        transactionRequestType.setShipTo(shipTo);
        transactionRequestType.setTransactionSettings(transactionSettings);

        const createRequest = new APIContracts.CreateTransactionRequest();
        createRequest.setMerchantAuthentication(this.merchantAuthenticationType);
        createRequest.setTransactionRequest(transactionRequestType);

        this.logger.log(createRequest.getJSON());

        const ctrl = new APIControllers.CreateTransactionController(createRequest.getJSON());

        const response$ = executeTransaction(ctrl).pipe(
            catchError(error =>
            {
                throw new Error('Error executing transaction');
            })
        );

        return firstValueFrom(response$);
    }
}
