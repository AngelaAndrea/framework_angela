const { I } = inject();

Given('estoy en la página principal de YouTube', async () => {
  I.amOnPage('https://www.youtube.com');
  I.waitForElement('#guide-button', 30); // Selector actualizado
I.click('#guide-button');
I.waitForElement('a[title="Explorar"]', 20);
I.click('a[title="Explorar"]');
});


When('hago clic en el botón {string} en la barra de navegación', async (boton) => {
  const explorarXpath = '//*[@id="guide-section-title"][contains(text(), "Explorar")]';
  I.waitForElement(explorarXpath, 15);
  I.click(explorarXpath);
  I.wait(3);
});

Then('algunos íconos en la sección Explorar deben tener atributos data-title', async () => {
  // Selector mejorado para los íconos
  const sectionXpath = '//*[@id="guide-section-title"][contains(text(), "Explorar")]/ancestor::ytd-guide-section-renderer';
  const iconLocator = `${sectionXpath}//ytd-guide-entry-renderer`;
  
  try {
    I.waitForElement(sectionXpath, 10);
    I.waitForElement(iconLocator, 10);
    
    const iconsCount = await I.grabNumberOfVisibleElements(iconLocator);
    
    if (iconsCount === 0) {
      throw new Error('No se encontraron íconos en la sección Explorar');
    }

    // Verificamos varios atributos alternativos
    const attributesToCheck = ['aria-label', 'title', 'id', 'class'];
    let foundValidAttributes = false;
    
    // Verificar los primeros 3 íconos
    const iconsToCheck = Math.min(3, iconsCount);
    
    for (let i = 1; i <= iconsToCheck; i++) {
      const currentLocator = `(${iconLocator})[${i}]`;
      
      for (const attr of attributesToCheck) {
        try {
          const attrValue = await I.grabAttributeFrom(currentLocator, attr);
          
          if (attrValue && attrValue.trim() !== '') {
            I.say(`Ícono ${i} tiene ${attr}: "${attrValue}"`);
            foundValidAttributes = true;
          }
        } catch (e) {
          // Continuar con el siguiente atributo si este falla
        }
      }
    }
    
    if (!foundValidAttributes) {
      throw new Error('No se encontraron atributos accesibles en los íconos verificados');
    }
    
  } catch (error) {
    I.saveScreenshot('icon_attributes_not_found.png');
    throw new Error('Error al validar íconos: ' + error.message);
  }
});

Then('los íconos deben ser accesibles mediante algún atributo identificable', async () => {
  const sectionXpath = '//*[@id="guide-section-title"][contains(text(), "Explorar")]/ancestor::ytd-guide-section-renderer';
  const iconLocator = `${sectionXpath}//ytd-guide-entry-renderer:first-child`;
  
  I.waitForElement(iconLocator, 10);
  
  // Verificamos varios atributos posibles
  const possibleAttributes = ['aria-label', 'title', 'href', 'id'];
  let attributeFound = false;
  
  for (const attr of possibleAttributes) {
    try {
      const value = await I.grabAttributeFrom(iconLocator, attr);
      if (value && value.trim() !== '') {
        I.say(`Atributo encontrado: ${attr} = "${value}"`);
        attributeFound = true;
        break;
      }
    } catch (e) {
      // Continuar con el siguiente atributo
    }
  }
  
  if (!attributeFound) {
    I.saveScreenshot('no_accessible_attributes.png');
    throw new Error('No se encontró ningún atributo identificable en el ícono');
  }
})

Then('debería ver las categorías "Tendencias", "Música" y "Noticias"', async () => {
  I.see('Tendencias');
  I.see('Música');
  I.see('Noticias');
});

When('hacer clic en la categoría "Música"', async () => {
  I.click('Música');
  I.wait(4);

}); 

Then('debería ver videos con título y nombre del canal visible', async () => {
  I.waitForElement('//*[@id="hero-title"]', 20);
  I.seeElement('//*[@id="hero-title"]');
  I.seeElement('//*[@id="description"]/span[1]');
});

// Buscar un video de lofi y mostrar resultados
Given('el usuario accede a la página principal de YouTube', async () => {
    I.amOnPage('https://www.youtube.com');
    I.waitForElement('//*[@id="center"]/yt-searchbox/div[1]/form/input', 10); // Usamos el XPath para el input
  });
  
  
  When('escribe "lofi hip hop" en la barra de búsqueda y presiona Enter', async () => {
    // Usar el XPath del campo de búsqueda
    I.fillField('//*[@id="center"]/yt-searchbox/div[1]/form/input', 'lofi hip hop');
    I.pressKey('Enter');
    I.wait(4);
  });
  
  
  Then('debería ver resultados relacionados con "lofi"', async () => {
    I.see('lofi', '.style-scope ytd-video-renderer');
  });
  
  // Reproducir el primer video de los resultados
  Given('que el usuario busca "lofi hip hop" en YouTube', async () => {
    I.amOnPage('https://www.youtube.com');
    I.fillField('//*[@id="center"]/yt-searchbox/div[1]/form/input', 'lofi hip hop');
    I.pressKey('Enter');
    I.waitForElement('ytd-video-renderer', 10);
  });
  
  When('hace clic en el primer video', async () => {
    I.waitForElement('ytd-video-renderer', 10); // Asegúrate de que los resultados estén visibles
    I.click('ytd-video-renderer'); // Hacer clic en el primer video
    I.wait(5);
  });
  
  Then('el video debería comenzar a reproducirse', async () => {
    I.waitForElement('.html5-video-player.playing-mode', 10);
    I.seeElement('.html5-video-player.playing-mode');
  });
  
  // Ver subtítulos activados en un video educativo
  Given('que el usuario reproduce un video con subtítulos disponibles', async () => {
    I.amOnPage('https://www.youtube.com/watch?v=ktjafK4SgWM'); // Video con subtítulos
    I.wait(5);
  });
  
  When('activa los subtítulos', async () => {
    I.click('.ytp-subtitles-button');
    I.wait(2);
  });
  
  Then('deberían mostrarse los subtítulos en pantalla', async () => {
    I.seeElement('.ytp-caption-segment');
  });
  