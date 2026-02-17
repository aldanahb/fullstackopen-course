sequenceDiagram
    participant browser
    participant server

    Note: Usuario hace clic en "Save".
    Note: El codigo .js captura el evento. El controlador de eventos crea una nueva nota, la agrega a la lista de notas, vuelve a renderizar la lista de notas en la pagina y envia la nueva nota al servidor.

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    server-->>browser: HTTP 201 Created
    deactivate server
