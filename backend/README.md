# Endpoints

Tareas Comunes

- login
- cargar datos del perfil
- Vista administracion de usuarios


## /api/jugador

- GET:    Devuelve la lista de jugadores
- POST:   Crea un jugador
  - nombre
  - edad
  - responsable
  - moroso: bool
  - club
  - elo
- PUT:    Editar jugador
- DELETE: Dar de baja

### Frontend Jugador (esto va a la izq))

Esto va dentro:

- Listar 
- Adicionar (validar edad y asignar responsable)
- Editar (multar jugador)


## /api/partida

- GET:    Listar 
- POST:   Crea
  - id
  - torneo
  - jugadores
  - Resultado
- PUT:    Editar 
- DELETE: Eliminar

### Frontend Partida

- CRUD
- Apuntarse a partida
- Introducir resultado (se hace en el backend actualizar el elo de los jugadores)


## /api/club

- GET:    Listar 
- POST:   Crea
  - nombre
  - dir
  - entrenador
  - gerente
- PUT:    Editar 
- DELETE: Eliminar


### Frontend Club

- CRUD
- Resevar entrenamiento (consulta el calendario del entrenador)
- Listar jugadores (filtrando a listar jugadores)



## /api/torneo

- GET:    Listar 
- POST:   Crea
  - id
  - nombre
  - partidas (filtrando lista de partidas)
  - ganador
- PUT:    Editar 
- DELETE: Eliminar

### Frontend Torneo

- CRUD
- Listar partidas  (filtrando lista de partidas)


## /api/entrenadores

- GET:    Listar 
- POST:   Crea
  - id
  - nombre
- PUT:    Editar 
- DELETE: Eliminar

### Frontend Entrenadores

- CRUD

## /api/federaciones

- GET:    Listar 
- POST:   Crea
  - id
  - nombre
- PUT:    Editar 
- DELETE: Eliminar

### Frontend Federaciones

- CRUD
- Listar clubes (filtrando el listar clubes)








