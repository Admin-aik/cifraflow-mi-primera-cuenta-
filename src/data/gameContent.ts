import { Chapter, BankAccountProduct, RequirementItem, BankConsultationInfo } from '../types';

export const BANK_PROFILES: Record<string, BankConsultationInfo> = {
  'Banco de Venezuela': {
    show_info_card: true,
    bank_name: 'Banco de Venezuela (BDV)',
    account_type: 'Cuenta Digital BDV / BDVkids / Digital Juvenil',
    benefits: [
      'Inclusión digital 100% autogestionada desde la aplicación BDVApp',
      'Acceso inmediato a PagoMóvil BDV interbancario con código QR y SMS C2P',
      'Biometría avanzada mediante Biopago sin necesidad de tarjeta plástica',
      'Apertura para jóvenes y menores con acompañamiento tutor o mayores de 14 años'
    ],
    requirements: [
      'Cédula de Identidad laminada y vigente (o Digital verificada)',
      'Registro de Información Fiscal (RIF) vigente',
      'Número de teléfono celular personal activo y correo electrónico válido'
    ],
    code: '0102',
    colorTheme: 'red',
    tagline: 'Líder en banca pública nacional y pagos móviles inmediatos'
  },
  'Banco Plaza': {
    show_info_card: true,
    bank_name: 'Banco Plaza',
    account_type: 'Tu Cuenta Plaza / Cuenta Verde (Divisas)',
    benefits: [
      'Atención personalizada, ágil y moderna orientada a jóvenes emprendedores',
      'Cuenta Verde de custodia en moneda extranjera respaldada al 100%',
      'Herramientas interactivas de banca web Tu Plaza En Línea y Plaza Móvil',
      'Facilidades de microcrédito y pasarelas de pago para primeros negocios'
    ],
    requirements: [
      'Cédula de Identidad vigente y RIF actualizado',
      'Una (1) Referencia Personal o Bancaria verificable',
      'Constancia de Ingresos, Estudios o Certificación de Emprendimiento'
    ],
    code: '0138',
    colorTheme: 'emerald',
    tagline: 'Tu banco de confianza para emprender con solidez y agilidad'
  },
  'Banco del Tesoro': {
    show_info_card: true,
    bank_name: 'Banco del Tesoro',
    account_type: 'Cuenta Ahorro/Corriente Social / Tesoro En Línea',
    benefits: [
      'Educación financiera comunitaria y programas de impulso al primer empleo',
      'Integración total con plataformas públicas de pago y subsidios estatales',
      'Cuenta en Moneda Extranjera Plus y tarjeta de débito Tesoro Maestro',
      'Bajos montos mínimos de apertura y cero cobros por consultas de saldo'
    ],
    requirements: [
      'Cédula de Identidad original legible',
      'Copia de RIF actualizado y Recibo de servicio público o constancia de residencia',
      'Constancia de trabajo o declaración jurada de origen de fondos'
    ],
    code: '0163',
    colorTheme: 'amber',
    tagline: 'Banca social al servicio del desarrollo productivo y juvenil'
  }
};

export const BANK_PRODUCTS: BankAccountProduct[] = [
  {
    id: 'bdv-digital',
    nombre: 'Cuenta Digital BDV / Digital Juvenil',
    banco: 'Banco de Venezuela',
    codigoBanco: '0102',
    edadRequerida: 'A partir de 14 años (Juvenil) o 18+ años (Titular)',
    moneda: 'VES (Bolívares)',
    tasaInteres: 'Según normativa SUDEBAN (Rendimiento mensual sobre saldo promedio)',
    requisitosMinimos: ['Cédula Digital', 'RIF Digital', 'Teléfono Afiliado'],
    beneficiosClave: [
      'Apertura 100% digital desde BDVApp con reconocimiento facial',
      'PagoMóvil BDV instantáneo las 24 horas del día',
      'Uso en red nacional Biopago con huella dactilar'
    ],
    costoMantenimiento: 'Exenta de comisiones por mantenimiento mensual para jóvenes',
    canalesDigitales: ['BDVApp Móvil', 'BDVenLínea', 'PagoMóvil SMS 2661 / 2662', 'Biopago']
  },
  {
    id: 'bdv-divisas',
    nombre: 'Cuenta en Moneda Extranjera BDV',
    banco: 'Banco de Venezuela',
    codigoBanco: '0102',
    edadRequerida: '18+ años (o menor emancipado/con tutor)',
    moneda: 'USD/EUR (Divisas)',
    tasaInteres: '0% de interés (Cuenta de custodia y débito digital)',
    requisitosMinimos: ['Cédula Digital', 'RIF Digital', 'Cuenta en Bs. BDV activa'],
    beneficiosClave: [
      'Compra y venta de divisas a tasa oficial BCV',
      'Pagos en comercios con tarjeta de débito con cargo a la cuenta en divisas',
      'Transferencias interbancarias en divisas a nivel nacional'
    ],
    costoMantenimiento: 'Comisión fijada por el BCV por transacción cambiaria',
    canalesDigitales: ['BDVenLínea', 'BDVApp', 'Puntos de Venta Nacionales']
  },
  {
    id: 'plaza-verde',
    nombre: 'Cuenta Verde Plaza (Custodia en Divisas)',
    banco: 'Banco Plaza',
    codigoBanco: '0138',
    edadRequerida: '18+ años',
    moneda: 'USD/EUR (Divisas)',
    tasaInteres: 'Custodia segura según lineamientos del Banco Central de Venezuela',
    requisitosMinimos: ['Cédula Digital', 'RIF Digital', 'Referencia Personal'],
    beneficiosClave: [
      'Respaldo total de fondos en moneda dura',
      'Disponibilidad inmediata para consumo en bolívares al cambio oficial BCV',
      'Plataforma ágil de autogestión Tu Plaza En Línea'
    ],
    costoMantenimiento: 'Cero comisión de apertura, costo mínimo por custodia mensual',
    canalesDigitales: ['Tu Plaza En Línea', 'Plaza Móvil', 'Puntos de Venta Inteligentes']
  },
  {
    id: 'plaza-emprendedor',
    nombre: 'Tu Cuenta Plaza Emprendedor Joven',
    banco: 'Banco Plaza',
    codigoBanco: '0138',
    edadRequerida: '18+ años',
    moneda: 'VES (Bolívares)',
    tasaInteres: 'Interés nominal anual regulado',
    requisitosMinimos: ['Cédula Digital', 'RIF Digital', 'Constancia de Estudios/Trabajo', 'Referencia Personal'],
    beneficiosClave: [
      'Acceso a terminales de punto de venta (POS) y PagoMóvil C2P comercial',
      'Asesoría financiera personalizada para startups y negocios emergentes',
      'Límites de transferencia ampliados para transacciones comerciales'
    ],
    costoMantenimiento: 'Tarifa preferencial para emprendedores registrados',
    canalesDigitales: ['Plaza Móvil Empresas', 'Tu Plaza En Línea', 'API de Cobro']
  },
  {
    id: 'tesoro-social',
    nombre: 'Cuenta de Ahorro Social Tesoro',
    banco: 'Banco del Tesoro',
    codigoBanco: '0163',
    edadRequerida: 'Desde 12 años (con representante) o 18+ años',
    moneda: 'VES (Bolívares)',
    tasaInteres: 'Tasa pasiva fijada por el Banco Central de Venezuela',
    requisitosMinimos: ['Cédula Digital', 'RIF Digital', 'Constancia de Residencia'],
    beneficiosClave: [
      'Fomenta el hábito del ahorro con rendimientos mensuales',
      'Sin monto mínimo obligatorio para el primer depósito',
      'Vinculación directa a programas educativos y créditos comunitarios'
    ],
    costoMantenimiento: 'Completamente gratuita sin cobros ocultos',
    canalesDigitales: ['Tesoro En Línea', 'Tesoro PagoMóvil', 'Red de Agencias Comunitarias']
  }
];

export const REQUIREMENTS_CATALOG: RequirementItem[] = [
  {
    id: 'cedula',
    nombre: 'Cédula Digital de Identidad',
    descripcion: 'Documento nacional de identidad oficial emitido por el SAIME en formato digitalizado.',
    entidadEmisora: 'SAIME / Identidad Digital',
    icono: 'BadgeCheck',
    desbloqueadoEnCapitulo: 1,
    esObligatorio: true,
    detalles: [
      'Formato: V-XXXXXXXX o E-XXXXXXXX',
      'Estado: Vigente y legible en ambas caras',
      'Obligatorio para cualquier apertura bancaria en Venezuela'
    ]
  },
  {
    id: 'rif',
    nombre: 'RIF Digital Actualizado',
    descripcion: 'Registro Único de Información Fiscal expedido por el SENIAT con código QR activo.',
    entidadEmisora: 'SENIAT',
    icono: 'FileText',
    desbloqueadoEnCapitulo: 2,
    esObligatorio: true,
    detalles: [
      'Contiene domicilio fiscal verificado',
      'Vigencia estándar de 3 años',
      'Descarga directa en PDF desde el portal oficial del SENIAT'
    ]
  },
  {
    id: 'constancia',
    nombre: 'Constancia de Estudios / Trabajo',
    descripcion: 'Documento que certifica la ocupación lícita, matrícula escolar o actividad productiva.',
    entidadEmisora: 'Institución Educativa o Empleador',
    icono: 'GraduationCap',
    desbloqueadoEnCapitulo: 3,
    esObligatorio: true,
    detalles: [
      'Para estudiantes: Constancia de estudio o carnet estudiantil vigente',
      'Para trabajadores: Carta de trabajo con membrete y sello húmedo/digital',
      'Para emprendedores: Certificación de ingresos emitida por Contador o Declaración jurada'
    ]
  },
  {
    id: 'referencia',
    nombre: 'Referencia Personal Verificada',
    descripcion: 'Carta de recomendación de un tercero no familiar directo con datos de contacto verificables.',
    entidadEmisora: 'Referente Ciudadano Verificado',
    icono: 'Users',
    desbloqueadoEnCapitulo: 4,
    esObligatorio: true,
    detalles: [
      'Incluye nombre completo, C.I., número de teléfono y tiempo de conocer al solicitante',
      'No debe ser pariente consanguíneo de primer grado en la mayoría de normativas SUDEBAN',
      'Emisión no mayor a 30 días'
    ]
  },
  {
    id: 'biometria',
    nombre: 'Registro Biométrico Biopago',
    descripcion: 'Huella dactilar capturada y validada en el sistema interbancario de identidad.',
    entidadEmisora: 'Red Biopago / SUDEBAN',
    icono: 'Fingerprint',
    desbloqueadoEnCapitulo: 5,
    esObligatorio: false,
    detalles: [
      'Permite pagar y autorizar retiros con la huella dactilar sin tarjetas físicas',
      'Conexión encriptada con la base de datos nacional',
      'Mayor nivel de seguridad contra fraude'
    ]
  },
  {
    id: 'deposito_inicial',
    nombre: 'Depósito Mínimo Inicial',
    descripcion: 'Fondos iniciales ahorrados para activar el balance de la cuenta bancaria.',
    entidadEmisora: 'Billetera Cifraflow',
    icono: 'Coins',
    desbloqueadoEnCapitulo: 6,
    esObligatorio: true,
    detalles: [
      'Requerido por ciertas instituciones para emitir chequera o tarjeta plástica',
      'En cuentas 100% digitales suele ser 0 Bs., pero se recomienda un saldo inicial para transar'
    ]
  }
];

export const CHAPTERS: Chapter[] = [
  {
    id: 1,
    numero: 1,
    title: 'Capítulo #1: El Misterio del Primer Depósito',
    subtitle: 'La Encrucijada de la Plaza Central Cyber-Net',
    location: 'Plaza Central Cyber-Net (Frente a los Rascacielos BDV, Plaza y Tesoro)',
    difficulty: 'Inicial',
    bank_context: 'Banco de Venezuela',
    mission_goal: 'Comprender la diferencia crucial entre una Cuenta de Ahorro y una Cuenta Corriente en el Banco de Venezuela para ganar tus primeros $100 CifraTokens y desbloquear tu Cédula Digital.',
    source_text: `En la futurista Plaza Cyber-Net, tu avatar se sitúa frente a la imponente torre holográfica del Banco de Venezuela (0102). Un terminal cuántico te plantea tu primer desafío de apertura:

"Para gestionar tu dinero de forma inteligente, debes conocer la naturaleza del producto bancario:
1. La **Cuenta de Ahorro** es un instrumento financiero diseñado para acumular fondos que genera rendimientos (intereses mensuales sobre el saldo) y suele estar vinculada a una tarjeta de débito para retiros y PagoMóvil.
2. La **Cuenta Corriente** tradicionalmente se enfoca en una alta movilidad de fondos mediante cheques o transferencias masivas para pagos diarios y comerciales, y en ciertos casos no genera intereses pasivos.

Ambas cuentas en la actualidad venezolana cuentan con acceso a la app móvil **BDVApp**, pagos inmediatos **PagoMóvil BDV**, y validación en comercios con **Biopago**."`,
    challenge_type: 'Comprensión Lectora',
    question: 'Si tu objetivo principal como joven es resguardar tus fondos, ganar intereses periódicos sobre tus ahorros y realizar tus primeros pagos móviles en comercios, ¿cuál es la opción más idónea y por qué?',
    options: [
      {
        id: 1,
        text: 'La Cuenta Corriente, porque es obligatoria para poder usar cajeros automáticos y no permite transferir por PagoMóvil.',
        feedback_immediate: 'Incorrecto. La Cuenta Corriente permite transferencias, pero su objetivo primordial no es generar intereses pasivos de ahorro para jóvenes.',
        reward_if_correct: { dinero: 0, puntos: 0 }
      },
      {
        id: 2,
        text: 'La Cuenta de Ahorro (o Digital BDV), ya que genera rendimientos mensuales sobre el saldo acumulado, permite emitir PagoMóvil BDV y te ayuda a crear disciplina financiera.',
        feedback_immediate: '¡Excelente análisis financiero! La Cuenta de Ahorro te permite acumular saldo, generar intereses según la tasa fijada por el BCV y transar por BDVApp y PagoMóvil.',
        reward_if_correct: {
          dinero: 100,
          puntos: 50,
          requisitoDesbloqueado: 'Cédula Digital',
          cuentaDesbloqueada: 'BDV Digital'
        }
      },
      {
        id: 3,
        text: 'Ninguna de las anteriores, porque en Venezuela los bancos solo permiten abrir cuentas en efectivo de moneda extranjera sin registro de identidad.',
        feedback_immediate: 'Incorrecto. Todas las cuentas en Venezuela exigen verificación de identidad según la normativa SUDEBAN y están denominadas legalmente en bolívares y/o divisas.',
        reward_if_correct: { dinero: 0, puntos: 0 }
      }
    ],
    correct_option_id: 2,
    bank_info: BANK_PROFILES['Banco de Venezuela'],
    event_on_success: [
      'Holographic notification: ¡Reto de lectura superado con éxito! +$100 CifraTokens y +50 Puntos de Comprensión.',
      'Requirement unlocked: Has obtenido tu Cédula Digital de Identidad verificada.',
      'Visual change: Se ilumina el rascacielos holográfico del Banco de Venezuela y se habilita la entrada a la agencia virtual.'
    ]
  },
  {
    id: 2,
    numero: 2,
    title: 'Capítulo #2: El Protocolo PagoMóvil & Biopago',
    subtitle: 'La Autopista de Pagos Inmediatos BDV',
    location: 'Nodo de Pagos BDVApp & Red Interbancaria',
    difficulty: 'Inicial',
    bank_context: 'Banco de Venezuela',
    mission_goal: 'Aprender cómo funciona el sistema interbancario de PagoMóvil (P2P y C2P) y la seguridad de Biopago para ganar $120 y desbloquear tu RIF Digital.',
    source_text: `En el terminal de BDVApp, el sistema te muestra el funcionamiento de los pagos instantáneos en Venezuela:
- **PagoMóvil P2P (Persona a Persona):** El emisor transfiere usando el número de teléfono, cédula y banco destino (código de 4 dígitos, ej: 0102 para BDV, 0138 para Plaza, 0163 para Tesoro). La acreditación es inmediata.
- **PagoMóvil C2P (Comercio a Persona):** El comercio solicita el pago; el cliente genera un Token o Clave Dinámica temporal desde su banco y el comercio debita el monto con autorización del usuario.
- **Biopago BDV:** Sistema biométrico donde el usuario paga en puntos autorizados únicamente con su huella dactilar y cédula, sin requerir tarjeta física.`,
    challenge_type: 'Acertijo Lógico',
    question: 'Un comercio en el Cyber-Mall te pide cobrarte mediante "PagoMóvil C2P". ¿Cuál es el paso correcto que debes realizar como usuario pagador?',
    options: [
      {
        id: 1,
        text: 'Darle tu clave secreta de inicio de sesión de BDVenLínea para que el cajero entre a tu cuenta.',
        feedback_immediate: '¡PELIGRO DE CIBERSEGURIDAD! Jamás debes compartir tu contraseña bancaria ni coordenadas con nadie.',
        reward_if_correct: { dinero: 0, puntos: 0 }
      },
      {
        id: 2,
        text: 'Generar una clave de pago temporal (Token C2P) desde tu app bancaria o por SMS 2661/2662 y dársela al comercio junto con tu C.I. y teléfono.',
        feedback_immediate: '¡Correcto y seguro! En C2P generas un token dinámico de un solo uso que autoriza el débito exacto sin comprometer tus claves permanentes.',
        reward_if_correct: {
          dinero: 120,
          puntos: 60,
          requisitoDesbloqueado: 'RIF Digital',
          cuentaDesbloqueada: 'BDVkids / Digital Juvenil'
        }
      },
      {
        id: 3,
        text: 'Esperar a que el banco te llame por teléfono para pedirte los datos de tu tarjeta de crédito.',
        feedback_immediate: 'Incorrecto. Los bancos nunca llaman para solicitar contraseñas ni datos sensibles durante una compra C2P.',
        reward_if_correct: { dinero: 0, puntos: 0 }
      }
    ],
    correct_option_id: 2,
    bank_info: BANK_PROFILES['Banco de Venezuela'],
    event_on_success: [
      'Holographic notification: Protocolo C2P dominado con éxito. +$120 CifraTokens.',
      'Requirement unlocked: Has tramitado y obtenido tu RIF Digital (SENIAT).',
      'Visual change: Se desbloquea el simulador interactivo de PagoMóvil en tu HUD.'
    ]
  },
  {
    id: 3,
    numero: 3,
    title: 'Capítulo #3: La Bóveda Verde y Custodia en Divisas',
    subtitle: 'El Rascacielos de Banco Plaza',
    location: 'Torre Banco Plaza (Sector Financiero Este)',
    difficulty: 'Media',
    bank_context: 'Banco Plaza',
    mission_goal: 'Dominar el concepto de cuentas de custodia en moneda extranjera y el tipo de cambio oficial del BCV para ganar $150 y desbloquear tu Constancia de Estudios/Trabajo.',
    source_text: `Llegas a la elegante Torre de Cristal de Banco Plaza (0138). En el lounge de atención para jóvenes, el asesor digital te explica:

"La **Cuenta Verde de Banco Plaza** es una cuenta de custodia en moneda extranjera (USD/EUR) que permite a los ciudadanos venezolanos resguardar fondos en divisa extranjera de forma lícita dentro del sistema bancario nacional. 

Cuando realizas consumos en comercios locales, el banco puede realizar el débito directo de tu cuenta en divisas y liquidarlo al comercio en bolívares calculados a la **Tasa Oficial publicada por el Banco Central de Venezuela (BCV)** del día de la operación, garantizando transparencia y protección cambiaria."`,
    challenge_type: 'Comprensión Lectora',
    question: 'Si posees fondos en tu Cuenta Verde de Banco Plaza y compras un artículo valorado en 730 Bolívares en un comercio nacional, y la tasa oficial BCV es de 36.50 Bs/USD, ¿cómo se procesa tu transacción?',
    options: [
      {
        id: 1,
        text: 'El banco te debita exactamente $20 USD de tu cuenta verde (730 / 36.50 = 20) al cambio oficial legal sin intermediarios informales.',
        feedback_immediate: '¡Cálculo y concepto impecables! Con la tasa oficial BCV de 36.50 Bs/USD, $20 USD cubren exactamente los 730 Bs. de tu compra de forma legal y segura.',
        reward_if_correct: {
          dinero: 150,
          puntos: 75,
          requisitoDesbloqueado: 'Constancia de Estudios/Trabajo',
          cuentaDesbloqueada: 'Banco Plaza Verde'
        }
      },
      {
        id: 2,
        text: 'El banco te cobra a una tasa arbitraria no regulada porque las cuentas en divisas no siguen las resoluciones del BCV.',
        feedback_immediate: 'Incorrecto. Toda la banca venezolana está obligada por SUDEBAN y BCV a utilizar estrictamente la tasa oficial del día.',
        reward_if_correct: { dinero: 0, puntos: 0 }
      },
      {
        id: 3,
        text: 'Debes sacar el dinero en billetes físicos en la taquilla y cambiarlos en la calle antes de poder comprar.',
        feedback_immediate: 'Incorrecto. Las tarjetas y débitos en divisas convierten automáticamente en el punto de venta a la tasa BCV oficial.',
        reward_if_correct: { dinero: 0, puntos: 0 }
      }
    ],
    correct_option_id: 1,
    bank_info: BANK_PROFILES['Banco Plaza'],
    event_on_success: [
      'Holographic notification: ¡Módulo de Custodia en Divisas completado! +$150 CifraTokens.',
      'Requirement unlocked: Has anexado tu Constancia de Estudios / Emprendimiento.',
      'Visual change: Se desbloquea la Cuenta Verde de Banco Plaza en tu portafolio.'
    ]
  },
  {
    id: 4,
    numero: 4,
    title: 'Capítulo #4: El Acelerador de Jóvenes Emprendedores',
    subtitle: 'El Ecosistema Comercial Plaza',
    location: 'Laboratorio FinTech de Banco Plaza',
    difficulty: 'Media',
    bank_context: 'Banco Plaza',
    mission_goal: 'Aprender cómo un joven puede vincular su primera cuenta bancaria a herramientas de cobro comercial y obtener su Referencia Personal Verificada.',
    source_text: `El Director de Emprendimiento de Banco Plaza te guía por el simulador de negocios juveniles:

"Para que un joven o freelancer empiece a recibir pagos por sus servicios o productos (diseño, programación, repostería, etc.), no basta con tener una cuenta personal informal. 
Al tramitar **Tu Cuenta Plaza Emprendedor**:
1. Obtienes herramientas de cobro como el **Botón de Pago Web**, **Punto de Venta Móvil** y **PagoMóvil C2P Comercial**.
2. Cumples con la providencia del SENIAT al vincular tu RIF personal o de firma personal.
3. Generas historial financiero que te permite optar a microcréditos para equipamiento tecnológico."`,
    challenge_type: 'Selección Financiera',
    question: '¿Por qué es fundamental para un joven profesional mantener sus ingresos de emprendimiento en una cuenta bancaria formal en lugar de guardarlo todo en efectivo informal?',
    options: [
      {
        id: 1,
        text: 'Porque el efectivo informal no genera historial crediticio, no está protegido contra pérdidas físicas y limita tus ventas a clientes que solo tienen efectivo.',
        feedback_immediate: '¡Brillante visión de negocios! La bancarización te abre las puertas al crédito, asegura tus fondos y te permite cobrar a millones de usuarios por PagoMóvil y transferencias.',
        reward_if_correct: {
          dinero: 180,
          puntos: 90,
          requisitoDesbloqueado: 'Referencia Personal',
          cuentaDesbloqueada: 'Tu Cuenta Plaza'
        }
      },
      {
        id: 2,
        text: 'Porque el dinero bancarizado solo se puede gastar los días domingos por ley.',
        feedback_immediate: 'Incorrecto. La banca electrónica y digital funciona las 24 horas, los 365 días del año.',
        reward_if_correct: { dinero: 0, puntos: 0 }
      },
      {
        id: 3,
        text: 'Porque los bancos prohíben que los jóvenes tengan emprendimientos propios.',
        feedback_immediate: 'Falso. Las entidades bancarias cuentan con programas específicos para jóvenes y emprendedores.',
        reward_if_correct: { dinero: 0, puntos: 0 }
      }
    ],
    correct_option_id: 1,
    bank_info: BANK_PROFILES['Banco Plaza'],
    event_on_success: [
      'Holographic notification: ¡Reto de Emprendimiento superado! +$180 CifraTokens.',
      'Requirement unlocked: Has conseguido una Referencia Personal Verificada.',
      'Visual change: Se desbloquea la cuenta comercial juvenil de Banco Plaza.'
    ]
  },
  {
    id: 5,
    numero: 5,
    title: 'Capítulo #5: La Red de Inclusión y Tesoro Social',
    subtitle: 'El Nodo Comunitario de Banco del Tesoro',
    location: 'Nodo Comunitario Banco del Tesoro (Sector Cívico)',
    difficulty: 'Media',
    bank_context: 'Banco del Tesoro',
    mission_goal: 'Entender el rol de la banca pública social, los programas comunitarios y la plataforma Tesoro En Línea para ganar $200 y desbloquear la Verificación Biométrica.',
    source_text: `Entras al Nodo Comunitario del Banco del Tesoro (0163). Su lema resuena en las pantallas cibernéticas: 'Educación financiera e inclusión para todos los sectores'.

El analista de Tesoro En Línea te explica:
"El Banco del Tesoro fue concebido para democratizar el acceso a los servicios financieros en todas las regiones del país. Sus cuentas de ahorro social ofrecen:
- Cero barreras de entrada por estratificación económica.
- Integración para cobro de becas estudiantiles, proyectos comunitarios y pasantías.
- Tarjeta de Débito Tesoro con tecnología chip y sin costo abusivo de emisión.
- Servicio telefónico y digital Tesoro En Línea para consultas gratuitas."`,
    challenge_type: 'Comprensión Lectora',
    question: '¿Cuál es el beneficio social más relevante de abrir una Cuenta de Ahorro en el Banco del Tesoro como primer paso financiero para un estudiante o joven de comunidad?',
    options: [
      {
        id: 1,
        text: 'Facilita la bancarización sin montos mínimos excluyentes, permitiendo recibir pagos de becas, proyectos y aprender a ahorrar con costos cero de mantenimiento.',
        feedback_immediate: '¡Exacto! La inclusión financiera busca que ningún joven quede fuera del sistema económico formal por falta de capital inicial.',
        reward_if_correct: {
          dinero: 200,
          puntos: 100,
          requisitoDesbloqueado: 'Verificación Biométrica',
          cuentaDesbloqueada: 'Tesoro En Línea'
        }
      },
      {
        id: 2,
        text: 'Que el Banco del Tesoro regala criptomonedas no reguladas a quien abra la cuenta.',
        feedback_immediate: 'Incorrecto. Las instituciones reguladas por SUDEBAN operan con monedas oficiales y normadas.',
        reward_if_correct: { dinero: 0, puntos: 0 }
      },
      {
        id: 3,
        text: 'Que es la única cuenta donde no te piden cédula ni datos personales.',
        feedback_immediate: 'Falso. Todos los bancos exigen obligatoriamente la identificación del cliente (norma KYC de SUDEBAN).',
        reward_if_correct: { dinero: 0, puntos: 0 }
      }
    ],
    correct_option_id: 1,
    bank_info: BANK_PROFILES['Banco del Tesoro'],
    event_on_success: [
      'Holographic notification: ¡Inclusión Financiera asimilada! +$200 CifraTokens.',
      'Requirement unlocked: Huella y Biometría Biopago registradas.',
      'Visual change: Se desbloquea la cuenta social de Banco del Tesoro.'
    ]
  },
  {
    id: 6,
    numero: 6,
    title: 'Capítulo #6: El Bastión de Ciberseguridad FinTech',
    subtitle: 'El Escudo Antifraude del Ciberespacio',
    location: 'Centro de Comando de Seguridad Bancaria SUDEBAN',
    difficulty: 'Avanzada',
    bank_context: 'Ninguno',
    mission_goal: 'Aprender a identificar ataques de Phishing, proteger tus credenciales bancarias y usar contraseñas robustas para ganar $250 CifraTokens.',
    source_text: `Una alerta roja parpadea en tu visor cibernético: Varios atacantes intentan suplantar las identidades de los bancos (Phishing).

Reglas de Oro de Ciberseguridad Bancaria en Venezuela:
1. **Nunca ingreses a tu banco desde enlaces en correos o SMS sospechosos:** Escribe siempre tú mismo la dirección oficial (ej. www.bancodevenezuela.com, www.bancoplaza.com, www.bt.gob.ve).
2. **Los bancos NUNCA te pedirán por teléfono:** Tu clave secreta, las 3 coordenadas de tu tarjeta ni el código OTP que llega por SMS.
3. **Activa la autenticación en dos factores (2FA):** Usa biometría facial/dactilar en BDVApp, Plaza Móvil o Tesoro Móvil.
4. **Cuidado con falsos gestores:** Abrir cuentas bancarias en Venezuela es un trámite PERSONAL y GRATUITO.`,
    challenge_type: 'Ciberseguridad FinTech',
    question: 'Recibes un mensaje de WhatsApp que dice: "Urgente: Tu cuenta bancaria ha sido bloqueada. Haz clic en este enlace y escribe tu usuario, clave y coordenadas en 5 minutos para reactivarla". ¿Qué debes hacer?',
    options: [
      {
        id: 1,
        text: 'Hacer clic de inmediato y poner todas tus claves para no perder tu dinero.',
        feedback_immediate: '¡ERROR CRÍTICO! Eso es un ataque clásico de Phishing. Habrías entregado tus claves a ciberdelincuentes.',
        reward_if_correct: { dinero: 0, puntos: 0 }
      },
      {
        id: 2,
        text: 'Reenviar el mensaje a tus amigos por si a ellos también se les bloqueó la cuenta.',
        feedback_immediate: 'Incorrecto. Reenviar mensajes falsos solo propaga el fraude y la desinformación.',
        reward_if_correct: { dinero: 0, puntos: 0 }
      },
      {
        id: 3,
        text: 'Ignorar el enlace, bloquear el número remitente y verificar tu estado entrando directamente desde la aplicación bancaria oficial o web oficial.',
        feedback_immediate: '¡Excelente criterio de Ciberseguridad! Los bancos oficiales nunca solicitan claves ni reactivaciones por enlaces de mensajería no verificada.',
        reward_if_correct: {
          dinero: 250,
          puntos: 120,
          requisitoDesbloqueado: 'Depósito Mínimo Inicial'
        }
      }
    ],
    correct_option_id: 3,
    bank_info: {
      show_info_card: true,
      bank_name: 'Ciber-Seguridad SUDEBAN / Prevención de Fraude',
      account_type: 'Protocolos de Seguridad Bancaria Integral',
      benefits: [
        'Protección de fondos contra ingeniería social y robo de identidad',
        'Uso seguro de llaves de coordenadas y contraseñas de un solo uso (OTP)',
        'Resguardo legal de tu patrimonio en el sistema financiero regulado'
      ],
      requirements: [
        'Conexión segura SSL (https://)',
        'Contraseñas alfanuméricas con mayúsculas y caracteres especiales',
        'No usar redes WiFi públicas abiertas para entrar al banco'
      ],
      code: 'SEC',
      colorTheme: 'fuchsia',
      tagline: 'Tu seguridad es tu mejor inversión en la era digital'
    },
    event_on_success: [
      'Holographic notification: ¡Ataque de Phishing neutralizado! +$250 CifraTokens ganados.',
      'Requirement unlocked: Has consolidado tu Depósito Inicial y tu Billetera Segura.',
      'Visual change: Nivel de análisis elevado a AVANZADO.'
    ]
  },
  {
    id: 7,
    numero: 7,
    title: 'Capítulo #7: La Gran Simulación de Apertura Digital',
    subtitle: 'La Consagración Bancaria en el Metaverso',
    location: 'Consola Central de Apertura de Cuentas Nacionales',
    difficulty: 'Avanzada',
    bank_context: 'Banco de Venezuela',
    mission_goal: 'Superar el flujo completo de validación de requisitos y obtener tu primera cuenta bancaria real con tarjeta de débito virtual.',
    source_text: `Has llegado a la Consola Principal de Apertura. Tu expediente digital reúne todos los requisitos exigidos por la Superintendencia de las Instituciones del Sector Bancario (SUDEBAN):
- Cédula de Identidad Digital
- Registro de Información Fiscal (RIF)
- Constancia de Estudios / Empleo
- Referencia Personal
- Datos de contacto y Biometría

Estás listo para seleccionar tu banco de cabecera y formalizar la apertura de tu cuenta para comenzar a operar en la economía nacional.`,
    challenge_type: 'Apertura de Cuenta',
    question: 'Al completar la solicitud digital en la app de tu banco, ¿cuál es el siguiente paso clave para garantizar que tu cuenta comience a operar de forma óptima?',
    options: [
      {
        id: 1,
        text: 'Afiliarte inmediatamente a los servicios de PagoMóvil, configurar tus límites diarios de seguridad y guardar tus credenciales en un lugar privado y protegido.',
        feedback_immediate: '¡Misión Cumplida! Has completado el ciclo integral de educación financiera y apertura de tu primera cuenta bancaria.',
        reward_if_correct: {
          dinero: 300,
          puntos: 150,
          cuentaDesbloqueada: 'Cuenta Moneda Extranjera BDV'
        }
      },
      {
        id: 2,
        text: 'Publicar una foto de tu nueva tarjeta de débito completa con los números y el código CVV en redes sociales para celebrar.',
        feedback_immediate: '¡NO! Publicar los números de tus tarjetas expone tus fondos a compras fraudulentas por internet.',
        reward_if_correct: { dinero: 0, puntos: 0 }
      },
      {
        id: 3,
        text: 'Desinstalar la aplicación del banco para no consumir memoria del teléfono.',
        feedback_immediate: 'Incorrecto. La aplicación bancaria es tu canal principal para monitorear movimientos y alertas de seguridad.',
        reward_if_correct: { dinero: 0, puntos: 0 }
      }
    ],
    correct_option_id: 1,
    bank_info: BANK_PROFILES['Banco de Venezuela'],
    event_on_success: [
      'Holographic notification: ¡FELICIDADES! Has completado con éxito la aventura Cifraflow.',
      'Account unlocked: Has abierto y certificado tus primeras cuentas bancarias venezolanas.',
      'Master achievement: Título desbloqueado: Maestro de la Inclusión Financiera Digital.'
    ]
  }
];

export const FINANCIAL_TIPS: string[] = [
  '💡 En Venezuela, el código de banco de 4 dígitos (0102 BDV, 0138 Plaza, 0163 Tesoro) siempre va al inicio de tu número de cuenta de 20 dígitos.',
  '🔒 Nunca uses tu fecha de nacimiento o números correlativos (1234) como clave de cajero o acceso web.',
  '📊 El Banco Central de Venezuela (BCV) publica diariamente las tasas oficiales promedio ponderadas de las mesas de cambio.',
  '📱 PagoMóvil permite transferencias interbancarias inmediatas los 365 días del año, incluso fines de semana y feriados.',
  '🛡️ La biometría (Biopago) reduce el riesgo de clonación de tarjetas y agiliza las compras en comercios de todo el país.'
];
