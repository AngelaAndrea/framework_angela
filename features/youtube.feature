Feature: Validaciones de navegación y reproducción en YouTube

  Scenario: Usuario hace clic en "Explorar" y navega a la categoría Música
    Given estoy en la página principal de YouTube
    When hago clic en el botón "Explorar" en la barra de navegación
    Then debería ver las categorías "Tendencias", "Música" y "Noticias"
    When hacer clic en la categoría "Música"
    Then debería ver videos con título y nombre del canal visible

  Scenario: Validar atributos data-title en íconos de la sección Explorar
    Given estoy en la página principal de YouTube
    When hago clic en el botón "Explorar" en la barra de navegación
    Then algunos íconos en la sección Explorar deben tener atributos data-title

  Scenario: Buscar un video de lofi y mostrar resultados
    Given el usuario accede a la página principal de YouTube
    When escribe "lofi hip hop" en la barra de búsqueda y presiona Enter
    Then debería ver resultados relacionados con "lofi"

  Scenario: Reproducir el primer video de los resultados
    Given que el usuario busca "lofi hip hop" en YouTube
    When hace clic en el primer video
    Then el video debería comenzar a reproducirse

  Scenario: Ver subtítulos activados en un video educativo
    Given que el usuario reproduce un video con subtítulos disponibles
    When activa los subtítulos
    Then deberían mostrarse los subtítulos en pantalla
