/**
 * Gestion des cartes interactives pour le Géo Quiz
 * Utilise des SVG optimisés pour chaque zone géographique
 */

// Mapping des noms de pays vers leurs codes ISO (pour identifier les éléments SVG)
const COUNTRY_CODES = {
  // Europe
  'France': 'FR', 'Allemagne': 'DE', 'Italie': 'IT', 'Espagne': 'ES', 'Portugal': 'PT',
  'Belgique': 'BE', 'Pays-Bas': 'NL', 'Luxembourg': 'LU', 'Suisse': 'CH', 'Autriche': 'AT',
  'Pologne': 'PL', 'République tchèque': 'CZ', 'Hongrie': 'HU', 'Roumanie': 'RO', 
  'Bulgarie': 'BG', 'Grèce': 'GR', 'Croatie': 'HR', 'Slovénie': 'SI', 'Slovaquie': 'SK',
  'Danemark': 'DK', 'Suède': 'SE', 'Norvège': 'NO', 'Finlande': 'FI', 'Estonie': 'EE',
  'Lettonie': 'LV', 'Lituanie': 'LT', 'Irlande': 'IE', 'Royaume-Uni': 'GB', 'Islande': 'IS',
  'Malte': 'MT', 'Chypre': 'CY', 'Serbie': 'RS', 'Bosnie-Herzégovine': 'BA', 
  'Monténégro': 'ME', 'Macédoine du Nord': 'MK', 'Albanie': 'AL', 'Kosovo': 'XK',
  'Ukraine': 'UA', 'Biélorussie': 'BY', 'Moldavie': 'MD', 'Monaco': 'MC', 'Andorre': 'AD',
  'Saint-Marin': 'SM', 'Liechtenstein': 'LI', 'Vatican': 'VA', 'Russie': 'RU',
  
  // Amérique
  'États-Unis': 'US', 'Canada': 'CA', 'Mexique': 'MX', 'Brésil': 'BR', 'Argentine': 'AR',
  'Chili': 'CL', 'Colombie': 'CO', 'Pérou': 'PE', 'Venezuela': 'VE', 'Équateur': 'EC',
  'Bolivie': 'BO', 'Paraguay': 'PY', 'Uruguay': 'UY', 'Guyana': 'GY', 'Suriname': 'SR',
  'Guatemala': 'GT', 'Belize': 'BZ', 'Salvador': 'SV', 'Honduras': 'HN', 'Nicaragua': 'NI',
  'Costa Rica': 'CR', 'Panama': 'PA', 'Cuba': 'CU', 'Jamaïque': 'JM', 'Haïti': 'HT',
  'République dominicaine': 'DO', 'Bahamas': 'BS', 'Trinité-et-Tobago': 'TT', 'Barbade': 'BB',
  'Saint-Vincent-et-les-Grenadines': 'VC', 'Sainte-Lucie': 'LC', 'Grenade': 'GD',
  'Dominique': 'DM', 'Antigua-et-Barbuda': 'AG', 'Saint-Christophe-et-Niévès': 'KN',
  
  // Asie
  'Chine': 'CN', 'Japon': 'JP', 'Inde': 'IN', 'Corée du Sud': 'KR', 'Corée du Nord': 'KP',
  'Thaïlande': 'TH', 'Vietnam': 'VN', 'Indonésie': 'ID', 'Philippines': 'PH', 'Malaisie': 'MY',
  'Singapour': 'SG', 'Birmanie': 'MM', 'Cambodge': 'KH', 'Laos': 'LA', 'Bangladesh': 'BD',
  'Pakistan': 'PK', 'Sri Lanka': 'LK', 'Népal': 'NP', 'Bhoutan': 'BT', 'Maldives': 'MV',
  'Afghanistan': 'AF', 'Kazakhstan': 'KZ', 'Ouzbékistan': 'UZ', 'Turkménistan': 'TM',
  'Kirghizistan': 'KG', 'Tadjikistan': 'TJ', 'Mongolie': 'MN', 'Brunei': 'BN',
  'Timor oriental': 'TL', 'Turquie': 'TR', 'Iran': 'IR', 'Irak': 'IQ', 'Syrie': 'SY',
  'Liban': 'LB', 'Israël': 'IL', 'Palestine': 'PS', 'Jordanie': 'JO', 'Arabie saoudite': 'SA',
  'Yémen': 'YE', 'Oman': 'OM', 'Émirats arabes unis': 'AE', 'Qatar': 'QA', 'Bahreïn': 'BH',
  'Koweït': 'KW', 'Géorgie': 'GE', 'Arménie': 'AM', 'Azerbaïdjan': 'AZ', 'Chypre': 'CY',
  
  // Afrique
  'Égypte': 'EG', 'Libye': 'LY', 'Tunisie': 'TN', 'Algérie': 'DZ', 'Maroc': 'MA',
  'Soudan': 'SD', 'Soudan du Sud': 'SS', 'Éthiopie': 'ET', 'Érythrée': 'ER', 'Somalie': 'SO',
  'Djibouti': 'DJ', 'Kenya': 'KE', 'Tanzanie': 'TZ', 'Ouganda': 'UG', 'Rwanda': 'RW',
  'Burundi': 'BI', 'Nigeria': 'NG', 'Niger': 'NE', 'Tchad': 'TD', 'Cameroun': 'CM',
  'République centrafricaine': 'CF', 'Guinée équatoriale': 'GQ', 'Gabon': 'GA', 'Congo': 'CG',
  'République démocratique du Congo': 'CD', 'Angola': 'AO', 'Zambie': 'ZM', 'Zimbabwe': 'ZW',
  'Mozambique': 'MZ', 'Malawi': 'MW', 'Afrique du Sud': 'ZA', 'Lesotho': 'LS', 'Eswatini': 'SZ',
  'Namibie': 'NA', 'Botswana': 'BW', 'Madagascar': 'MG', 'Maurice': 'MU', 'Comores': 'KM',
  'Seychelles': 'SC', 'Ghana': 'GH', 'Togo': 'TG', 'Bénin': 'BJ', 'Burkina Faso': 'BF',
  'Mali': 'ML', 'Mauritanie': 'MR', 'Sénégal': 'SN', 'Gambie': 'GM', 'Guinée-Bissau': 'GW',
  'Guinée': 'GN', 'Sierra Leone': 'SL', 'Liberia': 'LR', 'Côte d\'Ivoire': 'CI',
  'Cap-Vert': 'CV', 'São Tomé-et-Principe': 'ST',
  
  // Océanie
  'Australie': 'AU', 'Nouvelle-Zélande': 'NZ', 'Papouasie-Nouvelle-Guinée': 'PG',
  'Fidji': 'FJ', 'Îles Salomon': 'SB', 'Vanuatu': 'VU', 'Samoa': 'WS', 'Tonga': 'TO',
  'Micronésie': 'FM', 'Palaos': 'PW', 'Îles Marshall': 'MH', 'Kiribati': 'KI',
  'Nauru': 'NR', 'Tuvalu': 'TV'
};

/**
 * Classe pour gérer la carte interactive
 */
class InteractiveMap {
  constructor(containerId, zone) {
    this.container = document.getElementById(containerId);
    this.zone = zone;
    this.svgElement = null;
    this.foundCountries = new Set();
    
    // Créer le tooltip
    this.tooltip = document.createElement('div');
    this.tooltip.className = 'country-tooltip';
    document.body.appendChild(this.tooltip);
    
    // Mapping inverse: code ISO -> nom
    this.codeToName = {};
    for (const [name, code] of Object.entries(COUNTRY_CODES)) {
      this.codeToName[code] = name;
    }
  }

  /**
   * Initialiser la carte pour la zone donnée
   */
  async init() {
    this.container.innerHTML = '<div style="text-align: center; color: #00838F; padding: 2rem;">Chargement de la carte...</div>';
    
    try {
      await this.loadSVGMap();
    } catch (error) {
      console.error('Erreur chargement carte:', error);
      this.renderPlaceholder();
    }
  }

  /**
   * Charger la carte SVG depuis le fichier
   */
  async loadSVGMap() {
    const mapFiles = {
      'monde': './worldLow.svg',
      'europe': './region_world_europeLow.svg',
      'asie': './region_world_asiaLow.svg',
      'afrique': './region_world_africaLow.svg',
      'amerique-nord': './region_world_northAmericaLow.svg',
      'amerique-sud': './region_world_southAmericaLow.svg',
      'oceanie': './region_world_oceaniaLow.svg'
    };

    const mapFile = mapFiles[this.zone];
    if (!mapFile) {
      console.error('Zone inconnue:', this.zone);
      this.renderPlaceholder();
      return;
    }

    console.log('Chargement de la carte:', mapFile);

    try {
      const response = await fetch(mapFile);
      console.log('Réponse fetch:', response.status, response.statusText);
      
      if (!response.ok) {
        throw new Error(`Carte non trouvée: ${mapFile} (status: ${response.status})`);
      }
      
      const svgText = await response.text();
      console.log('SVG chargé, taille:', svgText.length, 'caractères');
      
      this.container.innerHTML = svgText;
      this.svgElement = this.container.querySelector('svg');
      
      if (this.svgElement) {
        console.log('SVG inséré avec succès');
        
        // Styliser le SVG pour qu'il soit responsive
        this.svgElement.style.width = '100%';
        this.svgElement.style.height = '100%';
        this.svgElement.style.maxHeight = '400px';
        
        // Récupérer tous les pays (éléments path avec un ID)
        const countryPaths = this.svgElement.querySelectorAll('path[id]');
        console.log('Nombre de pays trouvés dans le SVG:', countryPaths.length);
        
        countryPaths.forEach(path => {
          // Couleur par défaut: gris clair
          path.style.fill = '#E8E8E8';
          path.style.stroke = '#FFFFFF';
          path.style.strokeWidth = '0.5';
          path.style.transition = 'fill 0.3s ease';
          path.style.cursor = 'pointer';
          
          // Effet hover
          path.addEventListener('mouseenter', (e) => {
            const countryCode = e.target.id;
            
            // Si le pays est trouvé, afficher le tooltip
            if (this.foundCountries.has(countryCode)) {
              const countryName = this.codeToName[countryCode] || countryCode;
              this.tooltip.textContent = countryName;
              this.tooltip.style.display = 'block';
            } else {
              e.target.style.fill = '#D0D0D0';
            }
          });
          
          path.addEventListener('mousemove', (e) => {
            // Positionner le tooltip près du curseur
            if (this.foundCountries.has(e.target.id)) {
              this.tooltip.style.left = (e.pageX + 15) + 'px';
              this.tooltip.style.top = (e.pageY - 10) + 'px';
            }
          });
          
          path.addEventListener('mouseleave', (e) => {
            // Masquer le tooltip
            this.tooltip.style.display = 'none';
            
            if (!this.foundCountries.has(e.target.id)) {
              e.target.style.fill = '#E8E8E8';
            }
          });
        });
      } else {
        console.error('Aucun élément SVG trouvé dans le contenu chargé');
        this.renderPlaceholder();
      }
    } catch (error) {
      console.error('Erreur chargement SVG:', error);
      this.renderPlaceholder();
    }
  }

  /**
   * Afficher un placeholder en cas d'erreur
   */
  renderPlaceholder() {
    const zoneEmojis = {
      'monde': '🌍',
      'europe': '🇪🇺',
      'asie': '🌏',
      'afrique': '🌍',
      'amerique-nord': '🌎',
      'amerique-sud': '🗺️',
      'oceanie': '🏝️'
    };

    this.container.innerHTML = `
      <div style="
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100%;
        gap: 15px;
      ">
        <div style="font-size: 4em;">${zoneEmojis[this.zone] || '🗺️'}</div>
        <div style="font-size: 1.3em; font-weight: bold; color: #00838F;">
          ${this.zone.charAt(0).toUpperCase() + this.zone.slice(1)}
        </div>
        <div style="font-size: 0.9em; color: #666;">
          Les pays trouvés s'affichent ci-dessous ⬇️
        </div>
      </div>
    `;
  }

  /**
   * Colorer un pays trouvé
   */
  colorCountry(countryName) {
    const code = COUNTRY_CODES[countryName];
    if (!code) {
      console.warn(`Code ISO non trouvé pour: ${countryName}`);
      return;
    }

    this.foundCountries.add(code);
    
    // Si on a un vrai SVG chargé, on colore l'élément
    if (this.svgElement) {
      const countryElement = this.svgElement.getElementById(code);
      if (countryElement) {
        // Animation de succès: flash puis couleur finale
        countryElement.style.fill = '#FFE66D'; // Flash jaune
        setTimeout(() => {
          countryElement.style.fill = '#48BB78'; // Vert succès
        }, 200);
      } else {
        console.warn(`Élément SVG non trouvé pour le code: ${code}`);
      }
    }
  }

  /**
   * Réinitialiser la carte
   */
  reset() {
    this.foundCountries.clear();
    if (this.svgElement) {
      // Réinitialiser toutes les couleurs
      const countries = this.svgElement.querySelectorAll('[id]');
      countries.forEach(country => {
        country.style.fill = '#E0E0E0'; // Couleur par défaut
      });
    }
  }

  /**
   * Obtenir le nombre de pays colorés
   */
  getFoundCount() {
    return this.foundCountries.size;
  }
}

// Export pour utilisation dans le HTML
window.InteractiveMap = InteractiveMap;
