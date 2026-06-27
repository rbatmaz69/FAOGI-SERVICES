import {
  Leaf,
  Scissors,
  Snowflake,
  Wrench,
  Sparkles,
  Fence,
  Home,
  Trash2,
  CalendarCheck,
  type LucideIcon,
} from 'lucide-react';

export interface Service {
  icon: LucideIcon;
  slug: string;
  title: string;
  /** Kurzbeschreibung für die Karte auf der Startseite */
  description: string;
  /** Einleitungstext auf der Detailseite */
  intro: string;
  /** Konkreter Leistungsumfang als Stichpunkte */
  bullets: string[];
}

export const services: Service[] = [
  {
    icon: Wrench,
    slug: 'hausmeisterservice',
    title: 'Hausmeisterservice',
    description: 'Umfassende Betreuung Ihrer Immobilie',
    intro:
      'Als Ihr zuverlässiger Hausmeisterservice kümmern wir uns um alle anfallenden Arbeiten rund um Ihre Immobilie – damit Sie sich um nichts sorgen müssen. Ob Wohnanlage, Gewerbeobjekt oder Privathaus: Wir sorgen für einen gepflegten und einwandfreien Zustand.',
    bullets: [
      'Regelmäßige Kontrollgänge und Sichtprüfung von Gebäude und Außenanlagen',
      'Kleinreparaturen an Türen, Fenstern, Sanitär- und Elektroinstallationen',
      'Pflege und Reinigung von Gemeinschaftsflächen, Treppenhäusern und Eingängen',
      'Übernahme von Kontroll- und Verkehrssicherungspflichten',
      'Koordination und Begleitung von Fachfirmen und Handwerkern',
      'Ansprechpartner für Mieter und Eigentümer',
    ],
  },
  {
    icon: Sparkles,
    slug: 'reinigung',
    title: 'Reinigung',
    description: 'Professionelle Reinigungsarbeiten innen und außen',
    intro:
      'Sauberkeit ist unsere Visitenkarte. Wir reinigen Innen- und Außenbereiche gründlich, zuverlässig und mit umweltschonenden Mitteln – einmalig oder im regelmäßigen Turnus, ganz nach Ihrem Bedarf.',
    bullets: [
      'Unterhalts- und Grundreinigung von Wohn- und Gewerbeflächen',
      'Treppenhaus- und Gemeinschaftsflächenreinigung',
      'Fenster-, Glas- und Rahmenreinigung',
      'Reinigung von Wegen, Höfen und Fassaden',
      'Bauschluss- und Endreinigung nach Renovierungen',
      'Flexible Intervalle: einmalig, wöchentlich oder monatlich',
    ],
  },
  {
    icon: Leaf,
    slug: 'gartenpflege',
    title: 'Gartenpflege',
    description: 'Professionelle Pflege Ihres Gartens das ganze Jahr über',
    intro:
      'Ein gepflegter Garten braucht das ganze Jahr über Aufmerksamkeit. Wir übernehmen die fachgerechte Pflege Ihrer Grünflächen – vom regelmäßigen Rasenmähen bis zum saisonalen Rückschnitt – damit Ihr Garten in jeder Jahreszeit von seiner besten Seite zeigt.',
    bullets: [
      'Rasen mähen, vertikutieren, düngen und nachsäen',
      'Hecken-, Strauch- und Baumschnitt',
      'Unkrautentfernung und Beetpflege',
      'Bepflanzung und Neugestaltung von Beeten',
      'Laubentfernung und Herbstaufräumung',
      'Grünschnitt-Entsorgung inklusive',
    ],
  },
  {
    icon: Scissors,
    slug: 'aussenanlagenpflege',
    title: 'Außenanlagenpflege',
    description: 'Gehwege, Höfe und befestigte Flächen',
    intro:
      'Wir halten Ihre Außenanlagen sauber, sicher und ansehnlich. Befestigte Flächen, Wege und Höfe pflegen wir regelmäßig, damit Ihr Objekt rundum einen gepflegten Eindruck hinterlässt.',
    bullets: [
      'Reinigung und Kehren von Gehwegen, Höfen und Parkplätzen',
      'Entfernung von Wildkraut in Fugen und Randbereichen',
      'Pflege von Pflasterflächen und Einfahrten',
      'Leerung und Reinigung von Abfallbehältern',
      'Pflege von Zaun- und Mauerbereichen',
      'Saisonale Grundreinigung der gesamten Außenanlage',
    ],
  },
  {
    icon: Snowflake,
    slug: 'winterdienst',
    title: 'Winterdienst',
    description: 'Zuverlässiger Schnee- und Räumdienst bei jedem Wetter',
    intro:
      'Wenn Schnee und Eis kommen, sind wir zur Stelle. Unser Winterdienst sorgt für sichere Wege und nimmt Ihnen die gesetzliche Räum- und Streupflicht zuverlässig ab – auch in den frühen Morgenstunden.',
    bullets: [
      'Schneeräumung von Wegen, Einfahrten und Zugängen',
      'Streuen bei Glätte mit umweltverträglichem Streugut',
      'Einhaltung der gesetzlichen Räum- und Streuzeiten',
      'Übernahme der Verkehrssicherungspflicht',
      'Saison-Verträge zum Festpreis möglich',
      'Bereitschaft auch an Wochenenden und Feiertagen',
    ],
  },
  {
    icon: Fence,
    slug: 'zaunmontage',
    title: 'Zaunmontage',
    description: 'Professionelle Montage und Reparatur von Zäunen',
    intro:
      'Ob Sichtschutz, Grundstücksbegrenzung oder Gartenzaun – wir montieren und reparieren Zäune fachgerecht und langlebig. Von der Beratung über die Materialauswahl bis zur sauberen Montage erhalten Sie alles aus einer Hand.',
    bullets: [
      'Beratung zu Material, Höhe und Ausführung',
      'Montage von Doppelstabmatten-, Holz- und Sichtschutzzäunen',
      'Setzen von Pfosten inklusive Fundament',
      'Einbau von Toren und Türen',
      'Reparatur und Austausch beschädigter Zaunelemente',
      'Fachgerechte Entsorgung alter Zäune',
    ],
  },
  {
    icon: Home,
    slug: 'terrassenueberdachung',
    title: 'Terrassenüberdachung',
    description: 'Planung und Montage von Terrassenüberdachungen',
    intro:
      'Genießen Sie Ihre Terrasse bei jedem Wetter. Wir planen und montieren hochwertige Terrassenüberdachungen, die Schutz vor Sonne und Regen bieten und Ihren Außenbereich aufwerten.',
    bullets: [
      'Individuelle Planung passend zu Haus und Terrasse',
      'Beratung zu Materialien (Aluminium, Holz, Glas)',
      'Aufmaß und maßgenaue Anfertigung',
      'Fachgerechte und stabile Montage',
      'Optionale Beschattung, Beleuchtung und Seitenwände',
      'Wartung und Reinigung bestehender Überdachungen',
    ],
  },
  {
    icon: Trash2,
    slug: 'entruempelung',
    title: 'Entrümpelung',
    description: 'Professionelle Entrümpelung von Wohnungen und Objekten',
    intro:
      'Wir schaffen Platz und Ordnung – schnell, diskret und besenrein. Ob Wohnung, Keller, Dachboden oder ganzes Objekt: Wir entrümpeln zuverlässig und entsorgen fachgerecht.',
    bullets: [
      'Entrümpelung von Wohnungen, Häusern, Kellern und Dachböden',
      'Haushaltsauflösungen – auch im Trauerfall, einfühlsam und diskret',
      'Demontage von Möbeln und Einbauten',
      'Fachgerechte Trennung und Entsorgung aller Materialien',
      'Besenreine Übergabe der Räumlichkeiten',
      'Transparente Festpreise nach kostenloser Besichtigung',
    ],
  },
  {
    icon: CalendarCheck,
    slug: 'event-planung',
    title: 'Event Planung',
    description: 'Planung und Organisation Ihrer Veranstaltungen – von der Idee bis zur Umsetzung',
    intro:
      'Von der ersten Idee bis zum letzten Detail – wir organisieren Ihre Veranstaltung, damit Sie den Moment unbeschwert genießen können. Ob private Feier oder Firmenevent: Wir kümmern uns um Aufbau, Ablauf und Abbau.',
    bullets: [
      'Beratung und Konzeption für Feiern, Hochzeiten und Firmenevents',
      'Organisation von Auf- und Abbau',
      'Bereitstellung und Dekoration von Tischen und Mobiliar',
      'Koordination von Dienstleistern und Lieferanten',
      'Betreuung vor und während der Veranstaltung',
      'Reinigung und Aufräumung nach dem Event',
    ],
  },
];
