# Catch Decorator

## Description

Typescript decorator for handling your exceptions elegantly.

<br />


If you use Typescript enable `experimentalDecorators` flag inside your tsconfig file, otherwise for babel use one of the following plugins [babel-plugin-transform-decorators-legacy](https://github.com/loganfsmyth/babel-plugin-transform-decorators-legacy) or [@babel/plugin-proposal-decorators](https://github.com/babel/babel/tree/master/packages/babel-plugin-proposal-decorators).

<br />

## Usage

Considere el siguiente ejemplo:

```ts
class User {
  private repository;

  async getUser(id) {
    try {
      const user = await this.repository.fetch(id);
      return user;
    } catch (error) {
      if (error instanceof DatabaseError) {
        console.log('DatabaseError');
      } else if (error instanceof ConnectionError) {
        console.log('ConnectionError');
      } else {
        console.log('UnrecognizedError');
      }
    }
  }
}
```

Ahora reescribamos el ejemplo anterior usando el decorador introducido. El código sigue siendo semánticamente igual, pero más claro para que otros desarrolladores lo lean.

```ts
import { Catch, DefaultCatch } from 'catch-decorator';

class User {
  private repository;

  constructor() {
    this.getUser = this.getUser.bind(this);
  }

  @DefaultCatch((err, ctx, id) => console.log('UnrecognizedError'))
  @Catch(ConnectionError, (err, ctx, id) => console.log('ConnectionError'))
  @Catch(DatabaseError, (err, ctx, id) => console.log('DatabaseError'))
  async getUser(id) {
    const user = await this.repository.fetch(id);
    return user;
  }
}
```

Recuerde que al apilar decoradores su ejecución se realizará en orden inverso.

```ts
@DefaultCatch(quxHandler)
@Catch(Foo, fooHandler)
@Catch(Bar, barHandler)
@Catch(Baz, bazHandler)
someRandomMethod(){
  throw new QuxError("oops");
}
```

Lo que significa que los controladores anteriores se ejecutarán en el siguiente orden:

```
bazHandler -> barHandler -> fooHandler -> quxHandler
```

Además, es necesario colocar el decorador `DefaultCatch` en la parte superior; de lo contrario, todos los decoradores `Catch` que están encima de él no se ejecutarán ya que el controlador de `DefaultCatch` será llamado de todos modos con el tipo de error. Por supuesto, el método de decoración con "DefaultCatch" es opcional.

También es posible definir controladores de errores como variables externas o vincularlos como métodos estáticos de clase.

```ts
import { Catch, DefaultCatch, Handler } from 'catch-decorator';

const connectionErrorHandler: Handler = (err, ctx, id) =>
  console.log('ConnectionError');
const databaseErrorHandler: Handler = (err, ctx, id) =>
  console.log('DatabaseError');

class User {
  private repository;

  constructor() {
    this.getUser = this.getUser.bind(this);
  }

  @DefaultCatch(User.defaultErrorHandler)
  @Catch(ConnectionError, connectionErrorHandler)
  @Catch(DatabaseError, databaseErrorHandler)
  async getUser(id) {
    const user = await this.repository.fetch(id);
    return user;
  }

  static defaultErrorHandler: Handler = (err, ctx, id) =>
    console.log('UnrecognizedError');
}
```
