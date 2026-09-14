import kaelAvatar from './images/avatar_kael_comic_1787935343563.jpg';
import mayaAvatar from './images/avatar_maya_comic_1787935355784.jpg';
import valeriaAvatar from './images/avatar_valeria_comic_1787935367952.jpg';
import danteAvatar from './images/avatar_dante_comic_1787935379420.jpg';

import cafeScene from './images/comic_cafe_scene_1787935395723.jpg';
import bankScene from './images/comic_bank_scene_1787935407723.jpg';
import loftScene from './images/comic_loft_scene_1787935420171.jpg';
import cyberCityScene from './images/comic_cyber_city_1787935431686.jpg';
import carlosMaleAvatar from './images/avatar_carlos_male_1789389320286.jpg';
import cifraflowTeamBanner from './images/cifraflow_team_male_1789389338635.jpg';

export { cifraflowTeamBanner, carlosMaleAvatar };

export interface GameCharacter {
  id: string;
  name: string;
  fullName: string;
  age: string;
  role: string;
  specialty: string;
  concept: string;
  avatar: string;
  themeColor: 'cyan' | 'fuchsia' | 'emerald' | 'amber';
  badge: string;
  quote: string;
  perk: string;
  glowColor: string;
}

export interface GameScene {
  id: string;
  title: string;
  subtitle: string;
  concept: string;
  image: string;
  category: string;
}

export const CHARACTERS: GameCharacter[] = [
  {
    id: 'jorge',
    name: 'Jorge',
    fullName: 'Jorge (Adolescente)',
    age: '13 años',
    role: 'Operador Táctico de Accesos & Nómina',
    specialty: 'Salario Bruto vs. Neto & Blindaje FIDO2',
    concept: 'Joven estudiante adolescente a la izquierda con cabello castaño oscuro e interfaz táctica de pulso.',
    avatar: kaelAvatar,
    themeColor: 'cyan',
    badge: 'OPERADOR TÁCTICO',
    quote: '¡El primer depósito en mi cuenta digital BDVkids y el blindaje FIDO2 abren con seguridad todo el universo FinTech!',
    perk: '+15% Efectividad Finanzas & Blindaje FIDO2',
    glowColor: '#00f3ff'
  },
  {
    id: 'ircar',
    name: 'Ircar',
    fullName: 'Ircar (Adolescente)',
    age: '13 años',
    role: 'Especialista Cloud & Optimización Financiera',
    specialty: 'Radar Anti-Gastos & Escudo Cloud',
    concept: 'Joven femenina estudiante adolescente con visor holográfico, lentes en la cabeza glamorosa y sudadera.',
    avatar: mayaAvatar,
    themeColor: 'fuchsia',
    badge: 'ESPECIALISTA CLOUD',
    quote: 'Detectando los microgastos hormiga y activando el escudo Cloud blindamos cada bolívar y dólar de nuestra cuenta.',
    perk: 'Radar Anti-Gastos & Escudo Cloud',
    glowColor: '#ff007f'
  },
  {
    id: 'ivan',
    name: 'Iván',
    fullName: 'Iván (Adolescente)',
    age: '14 años',
    role: 'Auditor Forense Digital & Detective de Contratos',
    specialty: 'Monóculo Scanner de Cláusulas Abusivas',
    concept: 'Joven estudiante adolescente con visor de realidad virtual y monóculo scanner de código.',
    avatar: danteAvatar,
    themeColor: 'emerald',
    badge: 'AUDITOR FORENSE',
    quote: 'Ninguna letra chica engañosa ni comisión oculta en contratos bancarios escapa al scanner forense.',
    perk: 'Monóculo Scanner de Cláusulas Abusivas',
    glowColor: '#34d399'
  },
  {
    id: 'carlos',
    name: 'Carlos',
    fullName: 'Carlos (Adolescente)',
    age: '14 años',
    role: 'Estratega Presupuestario & Emprendimiento',
    specialty: 'Reactor 50/30/20 & Portafolios de Inversión',
    concept: 'Joven estudiante adolescente masculino estratega con gafas AR doradas y chaqueta táctica oscura con detalles luminosos en ámbar.',
    avatar: carlosMaleAvatar,
    themeColor: 'amber',
    badge: 'ESTRATEGA PRESUPUESTARIO',
    quote: '50% necesidades, 30% gustos y 20% inversión: la fórmula matemática del éxito financiero y el emprendimiento.',
    perk: 'Reactor 50/30/20 & Portafolios de Inversión',
    glowColor: '#fbbf24'
  }
];

// Helper to find character by ID with backward compatibility
export const getCharacterById = (id?: string): GameCharacter => {
  if (!id) return CHARACTERS[0];
  const normalized = id.toLowerCase();
  if (normalized === 'kael') return CHARACTERS[0]; // Jorge
  if (normalized === 'maya') return CHARACTERS[1]; // Ircar
  if (normalized === 'dante') return CHARACTERS[2]; // Iván
  if (normalized === 'valeria') return CHARACTERS[3]; // Carlos
  return CHARACTERS.find(c => c.id === normalized) || CHARACTERS[0];
};

export const SCENES: GameScene[] = [
  {
    id: 'cafe',
    title: 'Cafetería Escolar Cyber-Net',
    subtitle: 'Primer Empleo & Salario Bruto vs. Neto',
    concept: 'Aprendiendo sobre Salario Bruto vs. Neto en su primer trabajo/pasantía escolar de verano.',
    image: cafeScene,
    category: 'Ingresos & Nómina'
  },
  {
    id: 'bank',
    title: 'Banco Cuántico & Reactor de Interés',
    subtitle: 'Efecto Bola de Nieve & Ahorro a Largo Plazo',
    concept: 'Visualizando el efecto "bola de nieve" de las alcancías e inversiones a largo plazo.',
    image: bankScene,
    category: 'Inversión & Crecimiento'
  },
  {
    id: 'loft',
    title: 'Cyber-Loft & Sala de Análisis',
    subtitle: 'Auditoría de Suscripciones & Comisiones Ocultas',
    concept: 'Leyendo la letra chica de suscripciones de consolas, alquileres de drones y compras en juegos.',
    image: loftScene,
    category: 'Ciberseguridad & Finanzas'
  },
  {
    id: 'city',
    title: 'Neo-Metrópolis Ciudad Cyber',
    subtitle: 'Horizonte Financiero Juvenil de Venezuela',
    concept: 'La metrópolis donde los jóvenes aprenden el dominio del dinero y la inclusión bancaria.',
    image: cyberCityScene,
    category: 'Distrito Interbancario'
  }
];

export const GAME_ART_ASSETS = {
  avatars: {
    kael: kaelAvatar,
    maya: mayaAvatar,
    valeria: valeriaAvatar,
    dante: danteAvatar
  },
  scenes: {
    cafe: cafeScene,
    bank: bankScene,
    loft: loftScene,
    city: cyberCityScene
  }
};
