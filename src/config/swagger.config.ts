import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = (serviceUrl: string, prefix: string) =>
    new DocumentBuilder()
        .setTitle('API.')
        .setDescription(
            'API.'
        )
        .addServer(`${serviceUrl}${prefix}`)
        .setVersion('1.0')
        .addBearerAuth()
        .build();
