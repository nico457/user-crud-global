# Endpoints de la API - `/api/v1/users`

La siguiente tabla detalla los métodos HTTP disponibles para el endpoint `/api/v1/users`, junto con sus respectivas descripciones y posibles parámetros.

| Método | Endpoint                  | Descripción                              | Parámetros                                      | Respuesta       |
|--------|---------------------------|------------------------------------------|------------------------------------------------|-----------------------------|
| GET    | `/api/v1/users`           | Obtiene la lista de todos los usuarios.  | `q` Texto libre para buscar por username, email, nombre o apellido. `role` Filtra usuarios por rol. | Lista de usuarios. |
| GET    | `/api/v1/users/{id}`      | Obtiene un usuario por su ID.            | **Path Param:**<br> - `id` (int): ID del usuario. | Detalles del usuario.       |
| POST   | `/api/v1/users`           | Crea un nuevo usuario.                   | **Body:**<br> - `nombre` (string): Nombre del usuario.<br> <br> - `apellido` (string): Apellido del usuario.<br> - <br> - `username` (string): Nombre de usuario.<br> -`email` (string): Correo electrónico.<br> - `age` (string): Edad. | Usuario creado con ID.      |
| PATCH    | `/api/v1/users/{id}`      | Actualiza los datos de un usuario.       | **Path Param:**<br> - `id` (int): ID del usuario.<br> **Body:**<br> - Atributos a actualizar (por ejemplo, `nombre`, `email`). | Usuario actualizado.        |
| DELETE | `/api/v1/users/{id}`      | Elimina un usuario por su ID.            | **Path Param:**<br> - `id` (int): ID del usuario. | Confirmación de eliminación. |
