# mongo__backend__auth

Para utilizarlo, hay que tener descargado el módulo de base de datos ***mongo__backend__db***.

Para poder correrlo, ejecutar ```yarn build``` para compilarlo y luego ```yarn start``` para iniciar el servicio.
El endpoint para probar el retorno de JWT es [http://localhost:3001/api/auth/sign-in]

Desde la pestaña de ***Authorization***, elegir en type ***Basic Auth*** e ingresar los siguientes datos de prueba:
~~~
__Username__: clemenicky
__Password__: Ciren2020
~~~

Retorna un JSON con el siguiente formato:
~~~
```
{
  "access_token": "JWT"
}
```
~~~
