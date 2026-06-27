import { useState } from 'react';
import { toast } from 'sonner';
import {
  X, Check, Building2, User, Users, Home, TreePine, Snowflake, Wrench,
  Sparkles, Trash2, ChevronRight, Briefcase, Church, Landmark,
  ArrowUpDown, FileText, Download, Mail, Phone as PhoneIcon
} from 'lucide-react';

interface ServiceConfiguratorProps {
  isOpen: boolean;
  onClose: () => void;
}

type ServiceType = 'one-time' | 'permanent' | '';
type CustomerType = 'owner' | 'manager' | 'business' | 'association' | 'municipality' | '';
type PropertyType = 'multi' | 'weg' | 'commercial' | 'single' | 'complex' | '';

interface FormData {
  serviceType: ServiceType;
  customerType: CustomerType;
  propertyType: PropertyType;
  parties: number;
  entrances: number;
  floors: number;
  hasElevator: string;
  outdoorArea: string;
  services: string[];

  // Cleaning details
  staircaseCleaning: {
    enabled: boolean;
    interval: string;
    count: number;
  };
  windowCleaning: {
    enabled: boolean;
    interval: string;
    floors: number;
  };
  elevatorCleaning: {
    enabled: boolean;
    interval: string;
  };
  commonRooms: {
    enabled: boolean;
    interval: string;
  };
  basement: {
    enabled: boolean;
    interval: string;
  };
  attic: {
    enabled: boolean;
    interval: string;
  };

  // Caretaker details
  controlProtocol: string;
  heatingControl: string;

  // Garden details
  greenArea: string;
  treesAndShrubs: number;
  lawnArea: string;

  // Outdoor maintenance
  outdoorInterval: string;
  hasUndergroundGarage: string;

  // Winter service
  hasAccessRoads: string;
  hasPublicSidewalks: string;

  // Waste management
  wasteManagement: {
    enabled: boolean;
    bioInterval: string;
    yellowInterval: string;
    blueInterval: string;
    blackInterval: string;
    cleaning: {
      enabled: boolean;
      interval: string;
    };
  };

  // Contact
  name: string;
  phone: string;
  email: string;
  address: string;

  // Contract
  contractDuration: number;
}

export function ServiceConfigurator({ isOpen, onClose }: ServiceConfiguratorProps) {
  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    serviceType: '',
    customerType: '',
    propertyType: '',
    parties: 4,
    entrances: 1,
    floors: 3,
    hasElevator: '',
    outdoorArea: '',
    services: [],

    staircaseCleaning: { enabled: false, interval: '', count: 1 },
    windowCleaning: { enabled: false, interval: '', floors: 0 },
    elevatorCleaning: { enabled: false, interval: '' },
    commonRooms: { enabled: false, interval: '' },
    basement: { enabled: false, interval: '' },
    attic: { enabled: false, interval: '' },

    controlProtocol: '',
    heatingControl: '',

    greenArea: '',
    treesAndShrubs: 5,
    lawnArea: '',

    outdoorInterval: '',
    hasUndergroundGarage: '',

    hasAccessRoads: '',
    hasPublicSidewalks: '',

    wasteManagement: {
      enabled: false,
      bioInterval: 'weekly',
      yellowInterval: 'biweekly',
      blueInterval: 'monthly',
      blackInterval: 'weekly',
      cleaning: { enabled: false, interval: '' }
    },

    name: '',
    phone: '',
    email: '',
    address: '',

    contractDuration: 12,
  });

  const allServices = ['hausmeister', 'reinigung', 'garten', 'aussenanlage', 'winter'];
  const isAllServicesSelected = formData.services.length === allServices.length;

  const validateAddress = (address: string): boolean => {
    // Check if address contains a 5-digit postcode
    const postcodeMatch = address.match(/\b\d{5}\b/);
    return postcodeMatch !== null;
  };

  const isContactComplete = () => {
    return formData.name && formData.phone && formData.email &&
           formData.address && validateAddress(formData.address);
  };

  const calculatePrice = () => {
    if (!isContactComplete()) {
      return { min: 0, max: 0, locked: true };
    }

    let basePrice = 150;

    if (formData.propertyType === 'multi') basePrice += 50;
    if (formData.propertyType === 'weg') basePrice += 60;
    if (formData.propertyType === 'commercial') basePrice += 80;
    if (formData.propertyType === 'complex') basePrice += 100;

    basePrice += formData.parties * 10;

    if (formData.services.includes('hausmeister')) {
      let caretakerPrice = 120;
      if (formData.controlProtocol === 'monthly') caretakerPrice += 40;
      if (formData.controlProtocol === 'quarterly') caretakerPrice += 20;
      if (formData.heatingControl === 'yes') caretakerPrice += 30;
      basePrice += caretakerPrice;
    }

    if (formData.services.includes('reinigung')) {
      let cleaningPrice = 0;
      if (formData.staircaseCleaning.enabled) {
        let stairPrice = 80;
        if (formData.staircaseCleaning.interval === 'weekly') stairPrice = 160;
        if (formData.staircaseCleaning.interval === 'biweekly') stairPrice = 100;
        cleaningPrice += stairPrice * formData.staircaseCleaning.count;
      }
      if (formData.windowCleaning.enabled) {
        cleaningPrice += formData.windowCleaning.floors * 15;
      }
      if (formData.elevatorCleaning.enabled) cleaningPrice += 40;
      if (formData.commonRooms.enabled) cleaningPrice += 50;
      if (formData.basement.enabled) cleaningPrice += 30;
      if (formData.attic.enabled) cleaningPrice += 30;
      basePrice += cleaningPrice;
    }

    if (formData.services.includes('garten')) basePrice += 100;
    if (formData.services.includes('aussenanlage')) {
      let outdoorPrice = 80;
      if (formData.outdoorInterval === 'weekly') outdoorPrice = 150;
      if (formData.outdoorInterval === 'biweekly') outdoorPrice = 100;
      if (formData.hasUndergroundGarage === 'yes') outdoorPrice += 40;
      basePrice += outdoorPrice;
    }
    if (formData.services.includes('winter')) basePrice += 90;

    if (formData.wasteManagement.enabled) {
      let wastePrice = 50;
      if (formData.wasteManagement.cleaning.enabled) wastePrice += 30;
      basePrice += wastePrice;
    }

    if (isAllServicesSelected) {
      basePrice *= 0.85;
    }

    // Contract duration discount
    if (formData.contractDuration === 24) {
      basePrice *= 0.9;
    } else if (formData.contractDuration === 12) {
      basePrice *= 0.95;
    }

    const minPrice = Math.round(basePrice * 0.9);
    const maxPrice = Math.round(basePrice * 1.15);

    return { min: minPrice, max: maxPrice, locked: false };
  };

  const resetForm = () => {
    setStep(0);
    setFormData({
      serviceType: '',
      customerType: '',
      propertyType: '',
      parties: 4,
      entrances: 1,
      floors: 3,
      hasElevator: '',
      outdoorArea: '',
      services: [],
      staircaseCleaning: { enabled: false, interval: '', count: 1 },
      windowCleaning: { enabled: false, interval: '', floors: 0 },
      elevatorCleaning: { enabled: false, interval: '' },
      commonRooms: { enabled: false, interval: '' },
      basement: { enabled: false, interval: '' },
      attic: { enabled: false, interval: '' },
      controlProtocol: '',
      heatingControl: '',
      greenArea: '',
      treesAndShrubs: 5,
      lawnArea: '',
      outdoorInterval: '',
      hasUndergroundGarage: '',
      hasAccessRoads: '',
      hasPublicSidewalks: '',
      wasteManagement: {
        enabled: false,
        bioInterval: 'weekly',
        yellowInterval: 'biweekly',
        blueInterval: 'monthly',
        blackInterval: 'weekly',
        cleaning: { enabled: false, interval: '' }
      },
      name: '',
      phone: '',
      email: '',
      address: '',
      contractDuration: 12,
    });
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const toggleService = (service: string) => {
    setFormData((prev) => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter((s) => s !== service)
        : [...prev.services, service],
    }));
  };

  const serviceLabels: Record<string, string> = {
    hausmeister: 'Hausmeisterservice Gebäude',
    reinigung: 'Innenreinigung',
    garten: 'Gartenpflege',
    aussenanlage: 'Außenanlagenpflege',
    winter: 'Winterdienst',
  };

  // Baut eine menschenlesbare Zusammenfassung der Konfiguration (für Download & E-Mail).
  const buildSummary = () => {
    const price = calculatePrice();
    const lines: string[] = [];
    lines.push('FAOGI SERVICES – Service-Konfiguration');
    lines.push('');
    lines.push(`Service-Art: ${formData.serviceType === 'permanent' ? 'Dauerservice' : 'Einmaliger Service'}`);
    lines.push(`Anfrage als: ${formData.customerType || '-'}`);
    lines.push(`Objektart: ${formData.propertyType || '-'}`);
    lines.push(`Parteien: ${formData.parties} · Eingänge: ${formData.entrances} · Stockwerke: ${formData.floors}`);
    lines.push(`Aufzug vorhanden: ${formData.hasElevator || '-'}`);
    lines.push(`Außenanlage: ${formData.outdoorArea || '-'}`);
    lines.push('');
    lines.push('Gewählte Leistungen:');
    formData.services.forEach((s) => lines.push(`  - ${serviceLabels[s] ?? s}`));
    if (formData.wasteManagement.enabled) lines.push('  - Mülltonnenmanagement');
    lines.push('');
    if (formData.serviceType === 'permanent') {
      lines.push(`Vertragslaufzeit: ${formData.contractDuration} Monate`);
    }
    if (!price.locked) {
      lines.push(
        `Preisindikation: ${price.min} € – ${price.max} € ${
          formData.serviceType === 'permanent' ? '/ Monat' : '(einmalig)'
        }`
      );
    }
    lines.push('');
    lines.push('Kontaktdaten:');
    lines.push(`  Name: ${formData.name}`);
    lines.push(`  Telefon: ${formData.phone}`);
    lines.push(`  E-Mail: ${formData.email}`);
    lines.push(`  Liegenschaft: ${formData.address}`);
    return lines.join('\n');
  };

  // Lädt die Konfiguration als Textdatei herunter (kein externer PDF-Dienst nötig).
  const downloadSummary = () => {
    const blob = new Blob([buildSummary()], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'faogi-konfiguration.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  // Sendet die Anfrage an das PHP-Mailskript (sendmail.php) auf dem all-inkl-Webspace.
  const submitRequest = async (kind: 'angebot' | 'besichtigung') => {
    if (!isContactComplete()) {
      toast.error('Bitte füllen Sie alle Kontaktdaten vollständig aus.');
      return;
    }
    setSubmitting(true);
    try {
      const price = calculatePrice();
      const res = await fetch('./sendmail.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: kind === 'besichtigung' ? 'Besichtigungstermin' : 'Angebotsanfrage (Rechner)',
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          priceMin: price.locked ? null : price.min,
          priceMax: price.locked ? null : price.max,
          summary: buildSummary(),
          website: '', // Honeypot-Feld (bleibt leer)
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.success) {
        toast.success(
          kind === 'besichtigung'
            ? 'Vielen Dank! Wir melden uns innerhalb von 24 Stunden zur Terminabstimmung.'
            : 'Vielen Dank für Ihre Anfrage! Wir melden uns innerhalb von 24 Stunden.'
        );
        handleClose();
      } else {
        toast.error(data.error || 'Senden fehlgeschlagen. Bitte rufen Sie uns an.');
      }
    } catch {
      toast.error('Netzwerkfehler. Bitte versuchen Sie es später erneut.');
    } finally {
      setSubmitting(false);
    }
  };

  if (!isOpen) return null;

  {/* TODO: Platzhalter entfernen, sobald Konfigurator finalisiert ist */}
  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="absolute inset-0 bg-black/60" onClick={handleClose} />

      <div className="relative bg-white w-full sm:max-w-md sm:rounded-2xl rounded-t-3xl p-8 text-center">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors"
          aria-label="Schließen"
        >
          <X className="w-5 h-5" />
        </button>

        <h3 className="text-xl mb-6 pt-2">FAOGI SERVICES</h3>

        <div className="bg-red-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5">
          <Wrench className="w-8 h-8 text-red-600" />
        </div>

        <h4 className="text-lg mb-2">Service-Konfigurator in Kürze verfügbar</h4>
        <p className="text-gray-600 text-sm leading-relaxed mb-6">
          Wir arbeiten gerade an unserem Online-Konfigurator. In der Zwischenzeit
          erstellen wir Ihnen gerne ein persönliches, unverbindliches Angebot –
          rufen Sie uns einfach an oder schreiben Sie uns.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href="tel:+4915224190030"
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl flex items-center justify-center gap-2 transition-colors"
          >
            <PhoneIcon className="w-5 h-5" />
            Jetzt anrufen
          </a>
          <a
            href="mailto:info@faogi-services.de"
            className="bg-gray-100 hover:bg-gray-200 text-black px-6 py-3 rounded-xl flex items-center justify-center gap-2 transition-colors"
          >
            <Mail className="w-5 h-5" />
            E-Mail schreiben
          </a>
        </div>
      </div>
    </div>
  );

  const getTotalSteps = () => {
    let steps = 8; // Base steps
    if (formData.services.includes('reinigung')) steps += 1;
    if (formData.wasteManagement.enabled) steps += 1;
    return steps;
  };

  const progress = ((step + 1) / getTotalSteps()) * 100;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="absolute inset-0 bg-black/60" onClick={handleClose} />

      <div className="relative bg-white w-full sm:max-w-2xl sm:rounded-2xl rounded-t-3xl max-h-[90vh] overflow-y-auto">
        {/* Header with FAOGI SERVICES branding */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 rounded-t-3xl z-10">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-center flex-1 text-xl">FAOGI SERVICES</h3>
            <button
              onClick={handleClose}
              className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="text-center mb-3">
            <p className="text-sm text-gray-600">Service Konfigurator</p>
          </div>

          <div className="flex items-center gap-2 text-xs text-gray-600 mb-2">
            <span>Schritt {step + 1} von {getTotalSteps()}</span>
          </div>
          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-red-600 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Step 0: Service Type Selection */}
          {step === 0 && (
            <div className="text-center py-8">
              <h2 className="text-2xl md:text-3xl mb-4 text-center">
                Welche Art von Service benötigen Sie?
              </h2>
              <p className="text-gray-600 mb-8 text-center">
                Wählen Sie zwischen einmaligem Service oder Dauerservice
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                <button
                  onClick={() => setFormData({ ...formData, serviceType: 'one-time' })}
                  className={`p-6 rounded-2xl border-2 transition-all ${
                    formData.serviceType === 'one-time'
                      ? 'border-red-600 bg-red-50'
                      : 'border-gray-200 hover:border-red-600'
                  }`}
                >
                  <Wrench className="w-10 h-10 mx-auto mb-3 text-red-600" />
                  <div className="mb-2">Einmaliger Service</div>
                  <p className="text-sm text-gray-600">Für einmalige Arbeiten und Projekte</p>
                </button>

                <button
                  onClick={() => setFormData({ ...formData, serviceType: 'permanent' })}
                  className={`p-6 rounded-2xl border-2 transition-all ${
                    formData.serviceType === 'permanent'
                      ? 'border-red-600 bg-red-50'
                      : 'border-gray-200 hover:border-red-600'
                  }`}
                >
                  <Building2 className="w-10 h-10 mx-auto mb-3 text-red-600" />
                  <div className="mb-2">Dauerservice</div>
                  <p className="text-sm text-gray-600">Langfristige Betreuung Ihrer Immobilie</p>
                </button>
              </div>

              <button
                onClick={() => formData.serviceType && setStep(1)}
                disabled={!formData.serviceType}
                className="w-full px-8 py-4 rounded-xl bg-red-600 text-white hover:bg-red-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors inline-flex items-center justify-center gap-2"
              >
                Weiter
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}

          {/* Step 1: Customer Type */}
          {step === 1 && (
            <div>
              <h3 className="mb-6 text-center">Wer fragt an?</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button
                  onClick={() => setFormData({ ...formData, customerType: 'owner' })}
                  className={`p-6 rounded-2xl border-2 transition-all ${
                    formData.customerType === 'owner'
                      ? 'border-red-600 bg-red-50'
                      : 'border-gray-200 hover:border-red-600'
                  }`}
                >
                  <User className="w-10 h-10 mx-auto mb-3 text-red-600" />
                  <div>Eigentümer</div>
                </button>

                <button
                  onClick={() => setFormData({ ...formData, customerType: 'manager' })}
                  className={`p-6 rounded-2xl border-2 transition-all ${
                    formData.customerType === 'manager'
                      ? 'border-red-600 bg-red-50'
                      : 'border-gray-200 hover:border-red-600'
                  }`}
                >
                  <Users className="w-10 h-10 mx-auto mb-3 text-red-600" />
                  <div className="text-sm">Verwalter / Hausverwaltung</div>
                </button>

                <button
                  onClick={() => setFormData({ ...formData, customerType: 'business' })}
                  className={`p-6 rounded-2xl border-2 transition-all ${
                    formData.customerType === 'business'
                      ? 'border-red-600 bg-red-50'
                      : 'border-gray-200 hover:border-red-600'
                  }`}
                >
                  <Briefcase className="w-10 h-10 mx-auto mb-3 text-red-600" />
                  <div>Gewerbebetrieb</div>
                </button>

                <button
                  onClick={() => setFormData({ ...formData, customerType: 'association' })}
                  className={`p-6 rounded-2xl border-2 transition-all ${
                    formData.customerType === 'association'
                      ? 'border-red-600 bg-red-50'
                      : 'border-gray-200 hover:border-red-600'
                  }`}
                >
                  <Church className="w-10 h-10 mx-auto mb-3 text-red-600" />
                  <div>Verein</div>
                </button>

                <button
                  onClick={() => setFormData({ ...formData, customerType: 'municipality' })}
                  className={`p-6 rounded-2xl border-2 transition-all ${
                    formData.customerType === 'municipality'
                      ? 'border-red-600 bg-red-50'
                      : 'border-gray-200 hover:border-red-600'
                  }`}
                >
                  <Landmark className="w-10 h-10 mx-auto mb-3 text-red-600" />
                  <div>Kommune</div>
                </button>
              </div>

              <div className="flex gap-3 mt-8">
                <button
                  onClick={() => setStep(0)}
                  className="flex-1 px-6 py-4 rounded-xl border-2 border-gray-200 hover:bg-gray-50 transition-colors"
                >
                  Zurück
                </button>
                <button
                  onClick={() => formData.customerType && setStep(2)}
                  disabled={!formData.customerType}
                  className="flex-1 px-6 py-4 rounded-xl bg-red-600 text-white hover:bg-red-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                >
                  Weiter
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Property Information */}
          {step === 2 && (
            <div>
              <h3 className="mb-6 text-center">Objektinformationen</h3>

              <div className="mb-6">
                <label className="block mb-3 text-sm">Objektart</label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { id: 'multi', label: 'Mehrfamilienhaus', icon: Building2 },
                    { id: 'weg', label: 'WEG (Wohnungseigentümergemeinschaft)', icon: Building2 },
                    { id: 'commercial', label: 'Gewerbeimmobilie', icon: Building2 },
                    { id: 'single', label: 'Einfamilienhaus', icon: Home },
                    { id: 'complex', label: 'Wohnanlage', icon: Building2 },
                  ].map((type) => {
                    const Icon = type.icon;
                    return (
                      <button
                        key={type.id}
                        onClick={() => setFormData({ ...formData, propertyType: type.id as PropertyType })}
                        className={`p-4 rounded-xl border-2 transition-all flex items-center gap-3 ${
                          formData.propertyType === type.id
                            ? 'border-red-600 bg-red-50'
                            : 'border-gray-200 hover:border-red-600'
                        }`}
                      >
                        <Icon className="w-6 h-6 text-red-600 flex-shrink-0" />
                        <span className="text-sm text-left">{type.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="mb-6">
                <label className="block mb-3 text-sm">Anzahl Parteien: {formData.parties}</label>
                <input
                  type="range"
                  min="1"
                  max="50"
                  value={formData.parties}
                  onChange={(e) => setFormData({ ...formData, parties: parseInt(e.target.value) })}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-red-600"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>1</span>
                  <span>50+</span>
                </div>
              </div>

              <div className="mb-6">
                <label className="block mb-3 text-sm">Anzahl Hauseingänge: {formData.entrances}</label>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={formData.entrances}
                  onChange={(e) => setFormData({ ...formData, entrances: parseInt(e.target.value) })}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-red-600"
                />
              </div>

              <div className="mb-6">
                <label className="block mb-3 text-sm">Stockwerke pro Eingang: {formData.floors}</label>
                <input
                  type="range"
                  min="1"
                  max="15"
                  value={formData.floors}
                  onChange={(e) => setFormData({ ...formData, floors: parseInt(e.target.value) })}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-red-600"
                />
              </div>

              <div className="mb-6">
                <label className="block mb-3 text-sm">Aufzug vorhanden?</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setFormData({ ...formData, hasElevator: 'yes' })}
                    className={`p-4 rounded-xl border-2 transition-all flex items-center justify-center gap-2 ${
                      formData.hasElevator === 'yes'
                        ? 'border-red-600 bg-red-50'
                        : 'border-gray-200 hover:border-red-600'
                    }`}
                  >
                    <ArrowUpDown className="w-5 h-5 text-red-600" />
                    <span>Ja</span>
                  </button>
                  <button
                    onClick={() => setFormData({ ...formData, hasElevator: 'no' })}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      formData.hasElevator === 'no'
                        ? 'border-red-600 bg-red-50'
                        : 'border-gray-200 hover:border-red-600'
                    }`}
                  >
                    Nein
                  </button>
                </div>
              </div>

              <div className="mb-6">
                <label className="block mb-3 text-sm">Gesamtfläche Außenanlage</label>
                <div className="grid grid-cols-2 gap-3">
                  {['bis 200 m²', '200–400 m²', '400–800 m²', 'über 800 m²'].map((area) => (
                    <button
                      key={area}
                      onClick={() => setFormData({ ...formData, outdoorArea: area })}
                      className={`p-3 rounded-xl border-2 transition-all text-sm ${
                        formData.outdoorArea === area
                          ? 'border-red-600 bg-red-50'
                          : 'border-gray-200 hover:border-red-600'
                      }`}
                    >
                      {area}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setStep(1)}
                  className="flex-1 px-6 py-4 rounded-xl border-2 border-gray-200 hover:bg-gray-50 transition-colors"
                >
                  Zurück
                </button>
                <button
                  onClick={() => formData.propertyType && formData.outdoorArea && formData.hasElevator && setStep(3)}
                  disabled={!formData.propertyType || !formData.outdoorArea || !formData.hasElevator}
                  className="flex-1 px-6 py-4 rounded-xl bg-red-600 text-white hover:bg-red-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                >
                  Weiter
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Services Selection */}
          {step === 3 && (
            <div>
              <h3 className="mb-6 text-center">Gewünschte Leistungen</h3>
              <p className="text-sm text-gray-600 mb-6 text-center">Mehrfachauswahl möglich</p>

              <div className="space-y-4 mb-6">
                <button
                  onClick={() => toggleService('hausmeister')}
                  className={`w-full p-5 rounded-2xl border-2 transition-all text-left ${
                    formData.services.includes('hausmeister')
                      ? 'border-red-600 bg-red-50'
                      : 'border-gray-200 hover:border-red-600'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                      formData.services.includes('hausmeister') ? 'bg-red-600' : 'bg-gray-100'
                    }`}>
                      <Wrench className={`w-6 h-6 ${
                        formData.services.includes('hausmeister') ? 'text-white' : 'text-gray-600'
                      }`} />
                    </div>
                    <div className="flex-1">
                      <h4 className="mb-1">Hausmeisterservice Gebäude</h4>
                      <p className="text-sm text-gray-600">Kontrollprotokolle • Kleinreparaturen • Heizungskontrolle</p>
                    </div>
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                      formData.services.includes('hausmeister')
                        ? 'border-red-600 bg-red-600'
                        : 'border-gray-300'
                    }`}>
                      {formData.services.includes('hausmeister') && (
                        <Check className="w-4 h-4 text-white" />
                      )}
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => toggleService('reinigung')}
                  className={`w-full p-5 rounded-2xl border-2 transition-all text-left ${
                    formData.services.includes('reinigung')
                      ? 'border-red-600 bg-red-50'
                      : 'border-gray-200 hover:border-red-600'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                      formData.services.includes('reinigung') ? 'bg-red-600' : 'bg-gray-100'
                    }`}>
                      <Sparkles className={`w-6 h-6 ${
                        formData.services.includes('reinigung') ? 'text-white' : 'text-gray-600'
                      }`} />
                    </div>
                    <div className="flex-1">
                      <h4 className="mb-1">Innenreinigung</h4>
                      <p className="text-sm text-gray-600">Treppenhaus • Fenster • Aufzug • Gemeinschaftsräume</p>
                    </div>
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                      formData.services.includes('reinigung')
                        ? 'border-red-600 bg-red-600'
                        : 'border-gray-300'
                    }`}>
                      {formData.services.includes('reinigung') && (
                        <Check className="w-4 h-4 text-white" />
                      )}
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => toggleService('garten')}
                  className={`w-full p-5 rounded-2xl border-2 transition-all text-left ${
                    formData.services.includes('garten')
                      ? 'border-red-600 bg-red-50'
                      : 'border-gray-200 hover:border-red-600'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                      formData.services.includes('garten') ? 'bg-red-600' : 'bg-gray-100'
                    }`}>
                      <TreePine className={`w-6 h-6 ${
                        formData.services.includes('garten') ? 'text-white' : 'text-gray-600'
                      }`} />
                    </div>
                    <div className="flex-1">
                      <h4 className="mb-1">Gartenpflege</h4>
                      <p className="text-sm text-gray-600">Rasenpflege • Heckenschnitt • Baumpflege</p>
                    </div>
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                      formData.services.includes('garten')
                        ? 'border-red-600 bg-red-600'
                        : 'border-gray-300'
                    }`}>
                      {formData.services.includes('garten') && (
                        <Check className="w-4 h-4 text-white" />
                      )}
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => toggleService('aussenanlage')}
                  className={`w-full p-5 rounded-2xl border-2 transition-all text-left ${
                    formData.services.includes('aussenanlage')
                      ? 'border-red-600 bg-red-50'
                      : 'border-gray-200 hover:border-red-600'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                      formData.services.includes('aussenanlage') ? 'bg-red-600' : 'bg-gray-100'
                    }`}>
                      <Trash2 className={`w-6 h-6 ${
                        formData.services.includes('aussenanlage') ? 'text-white' : 'text-gray-600'
                      }`} />
                    </div>
                    <div className="flex-1">
                      <h4 className="mb-1">Außenanlagenpflege</h4>
                      <p className="text-sm text-gray-600">Gehwege / Höfe • Laubbeseitigung • Tiefgarage</p>
                    </div>
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                      formData.services.includes('aussenanlage')
                        ? 'border-red-600 bg-red-600'
                        : 'border-gray-300'
                    }`}>
                      {formData.services.includes('aussenanlage') && (
                        <Check className="w-4 h-4 text-white" />
                      )}
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => toggleService('winter')}
                  className={`w-full p-5 rounded-2xl border-2 transition-all text-left ${
                    formData.services.includes('winter')
                      ? 'border-red-600 bg-red-50'
                      : 'border-gray-200 hover:border-red-600'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                      formData.services.includes('winter') ? 'bg-red-600' : 'bg-gray-100'
                    }`}>
                      <Snowflake className={`w-6 h-6 ${
                        formData.services.includes('winter') ? 'text-white' : 'text-gray-600'
                      }`} />
                    </div>
                    <div className="flex-1">
                      <h4 className="mb-1">Winterdienst</h4>
                      <p className="text-sm text-gray-600">Sicherheit bei Schnee & Eis • Schneeräumung • Streudienst</p>
                    </div>
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                      formData.services.includes('winter')
                        ? 'border-red-600 bg-red-600'
                        : 'border-gray-300'
                    }`}>
                      {formData.services.includes('winter') && (
                        <Check className="w-4 h-4 text-white" />
                      )}
                    </div>
                  </div>
                </button>
              </div>

              {isAllServicesSelected && (
                <div className="bg-gradient-to-r from-red-600 to-red-700 text-white p-6 rounded-2xl mb-6">
                  <div className="flex items-start gap-3">
                    <div className="bg-white/20 w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Check className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <h4 className="mb-2 text-lg">🎯 Rundum-Sorglos-Rabatt!</h4>
                      <p className="text-sm text-white/90 mb-3">Meistgewählte Lösung für Eigentümer & Verwalter</p>
                      <div className="space-y-1 text-sm">
                        <div className="flex items-center gap-2">
                          <Check className="w-4 h-4" />
                          <span>Alle Leistungen enthalten</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Check className="w-4 h-4" />
                          <span>15% Kombinationsrabatt</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Check className="w-4 h-4" />
                          <span>Ein Ansprechpartner</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Check className="w-4 h-4" />
                          <span>Prioritätsservice</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex gap-3">
                <button
                  onClick={() => setStep(2)}
                  className="flex-1 px-6 py-4 rounded-xl border-2 border-gray-200 hover:bg-gray-50 transition-colors"
                >
                  Zurück
                </button>
                <button
                  onClick={() => formData.services.length > 0 && setStep(4)}
                  disabled={formData.services.length === 0}
                  className="flex-1 px-6 py-4 rounded-xl bg-red-600 text-white hover:bg-red-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                >
                  Weiter
                </button>
              </div>
            </div>
          )}

          {/* Step 4: Caretaker Details */}
          {step === 4 && formData.services.includes('hausmeister') && (
            <div>
              <h3 className="mb-6 text-center">Hausmeisterservice Details</h3>

              <div className="bg-gray-50 p-5 rounded-2xl mb-6">
                <h4 className="mb-4 flex items-center gap-2">
                  <Wrench className="w-5 h-5 text-red-600" />
                  Kontrollprotokolle
                </h4>

                <div className="mb-4">
                  <label className="block mb-3 text-sm">Wie oft sollen Kontrollprotokolle erstellt werden?</label>
                  <div className="grid grid-cols-1 gap-2">
                    {[
                      { id: 'monthly', label: 'monatlich' },
                      { id: 'quarterly', label: 'vierteljährlich' },
                      { id: 'biannual', label: 'halbjährlich' },
                      { id: 'annual', label: 'jährlich' },
                      { id: 'none', label: 'keine' },
                    ].map((interval) => (
                      <button
                        key={interval.id}
                        onClick={() => setFormData({ ...formData, controlProtocol: interval.id })}
                        className={`p-3 rounded-xl border-2 transition-all text-sm ${
                          formData.controlProtocol === interval.id
                            ? 'border-red-600 bg-white'
                            : 'border-gray-200 hover:border-red-600 bg-white'
                        }`}
                      >
                        {interval.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block mb-3 text-sm">Heizungsanlage kontrollieren?</label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => setFormData({ ...formData, heatingControl: 'yes' })}
                      className={`p-3 rounded-xl border-2 transition-all ${
                        formData.heatingControl === 'yes'
                          ? 'border-red-600 bg-white'
                          : 'border-gray-200 hover:border-red-600 bg-white'
                      }`}
                    >
                      Ja
                    </button>
                    <button
                      onClick={() => setFormData({ ...formData, heatingControl: 'no' })}
                      className={`p-3 rounded-xl border-2 transition-all ${
                        formData.heatingControl === 'no'
                          ? 'border-red-600 bg-white'
                          : 'border-gray-200 hover:border-red-600 bg-white'
                      }`}
                    >
                      Nein
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setStep(3)}
                  className="flex-1 px-6 py-4 rounded-xl border-2 border-gray-200 hover:bg-gray-50 transition-colors"
                >
                  Zurück
                </button>
                <button
                  onClick={() => formData.controlProtocol && formData.heatingControl && setStep(formData.services.includes('reinigung') ? 5 : 6)}
                  disabled={!formData.controlProtocol || !formData.heatingControl}
                  className="flex-1 px-6 py-4 rounded-xl bg-red-600 text-white hover:bg-red-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                >
                  Weiter
                </button>
              </div>
            </div>
          )}

          {/* Skip Step 4 if no Hausmeister */}
          {step === 4 && !formData.services.includes('hausmeister') && (
            <div>
              {(() => {
                setStep(formData.services.includes('reinigung') ? 5 : 6);
                return null;
              })()}
            </div>
          )}

          {/* Step 5: Cleaning Details */}
          {step === 5 && formData.services.includes('reinigung') && (
            <div>
              <h3 className="mb-6 text-center">Innenreinigung Details</h3>

              <div className="space-y-4">
                {/* Staircase Cleaning */}
                <div className="bg-gray-50 p-5 rounded-2xl">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-red-600" />
                      Treppenhausreinigung
                    </h4>
                    <button
                      onClick={() => setFormData({
                        ...formData,
                        staircaseCleaning: { ...formData.staircaseCleaning, enabled: !formData.staircaseCleaning.enabled }
                      })}
                      className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                        formData.staircaseCleaning.enabled
                          ? 'bg-red-600 text-white'
                          : 'bg-gray-200 text-gray-700'
                      }`}
                    >
                      {formData.staircaseCleaning.enabled ? 'Aktiv' : 'Inaktiv'}
                    </button>
                  </div>

                  {formData.staircaseCleaning.enabled && (
                    <>
                      <div className="mb-4">
                        <label className="block mb-2 text-sm">Intervall</label>
                        <div className="grid grid-cols-1 gap-2">
                          {[
                            { id: 'weekly', label: 'wöchentlich' },
                            { id: 'biweekly', label: '2× monatlich' },
                            { id: 'monthly', label: 'monatlich' },
                          ].map((interval) => (
                            <button
                              key={interval.id}
                              onClick={() => setFormData({
                                ...formData,
                                staircaseCleaning: { ...formData.staircaseCleaning, interval: interval.id }
                              })}
                              className={`p-2 rounded-lg border-2 transition-all text-sm ${
                                formData.staircaseCleaning.interval === interval.id
                                  ? 'border-red-600 bg-white'
                                  : 'border-gray-200 hover:border-red-600 bg-white'
                              }`}
                            >
                              {interval.label}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block mb-2 text-sm">Anzahl Treppenhäuser: {formData.staircaseCleaning.count}</label>
                        <input
                          type="range"
                          min="1"
                          max="10"
                          value={formData.staircaseCleaning.count}
                          onChange={(e) => setFormData({
                            ...formData,
                            staircaseCleaning: { ...formData.staircaseCleaning, count: parseInt(e.target.value) }
                          })}
                          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-red-600"
                        />
                      </div>
                    </>
                  )}
                </div>

                {/* Window Cleaning */}
                <div className="bg-gray-50 p-5 rounded-2xl">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-red-600" />
                      Fensterreinigung
                    </h4>
                    <button
                      onClick={() => setFormData({
                        ...formData,
                        windowCleaning: { ...formData.windowCleaning, enabled: !formData.windowCleaning.enabled }
                      })}
                      className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                        formData.windowCleaning.enabled
                          ? 'bg-red-600 text-white'
                          : 'bg-gray-200 text-gray-700'
                      }`}
                    >
                      {formData.windowCleaning.enabled ? 'Aktiv' : 'Inaktiv'}
                    </button>
                  </div>

                  {formData.windowCleaning.enabled && (
                    <>
                      <div className="mb-4">
                        <label className="block mb-2 text-sm">Intervall</label>
                        <div className="grid grid-cols-1 gap-2">
                          {[
                            { id: 'monthly', label: 'monatlich' },
                            { id: 'quarterly', label: 'vierteljährlich' },
                            { id: 'biannual', label: 'halbjährlich' },
                          ].map((interval) => (
                            <button
                              key={interval.id}
                              onClick={() => setFormData({
                                ...formData,
                                windowCleaning: { ...formData.windowCleaning, interval: interval.id }
                              })}
                              className={`p-2 rounded-lg border-2 transition-all text-sm ${
                                formData.windowCleaning.interval === interval.id
                                  ? 'border-red-600 bg-white'
                                  : 'border-gray-200 hover:border-red-600 bg-white'
                              }`}
                            >
                              {interval.label}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block mb-2 text-sm">Anzahl Stockwerke: {formData.windowCleaning.floors}</label>
                        <input
                          type="range"
                          min="1"
                          max="15"
                          value={formData.windowCleaning.floors}
                          onChange={(e) => setFormData({
                            ...formData,
                            windowCleaning: { ...formData.windowCleaning, floors: parseInt(e.target.value) }
                          })}
                          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-red-600"
                        />
                      </div>
                    </>
                  )}
                </div>

                {/* Elevator Cleaning */}
                {formData.hasElevator === 'yes' && (
                  <div className="bg-gray-50 p-5 rounded-2xl">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="flex items-center gap-2">
                        <ArrowUpDown className="w-5 h-5 text-red-600" />
                        Aufzugreinigung
                      </h4>
                      <button
                        onClick={() => setFormData({
                          ...formData,
                          elevatorCleaning: { ...formData.elevatorCleaning, enabled: !formData.elevatorCleaning.enabled }
                        })}
                        className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                          formData.elevatorCleaning.enabled
                            ? 'bg-red-600 text-white'
                            : 'bg-gray-200 text-gray-700'
                        }`}
                      >
                        {formData.elevatorCleaning.enabled ? 'Aktiv' : 'Inaktiv'}
                      </button>
                    </div>

                    {formData.elevatorCleaning.enabled && (
                      <div>
                        <label className="block mb-2 text-sm">Intervall</label>
                        <div className="grid grid-cols-1 gap-2">
                          {[
                            { id: 'weekly', label: 'wöchentlich' },
                            { id: 'biweekly', label: '2× monatlich' },
                            { id: 'monthly', label: 'monatlich' },
                          ].map((interval) => (
                            <button
                              key={interval.id}
                              onClick={() => setFormData({
                                ...formData,
                                elevatorCleaning: { ...formData.elevatorCleaning, interval: interval.id }
                              })}
                              className={`p-2 rounded-lg border-2 transition-all text-sm ${
                                formData.elevatorCleaning.interval === interval.id
                                  ? 'border-red-600 bg-white'
                                  : 'border-gray-200 hover:border-red-600 bg-white'
                              }`}
                            >
                              {interval.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Common Rooms */}
                <div className="bg-gray-50 p-5 rounded-2xl">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="flex items-center gap-2">
                      <Home className="w-5 h-5 text-red-600" />
                      Gemeinschaftsräume
                    </h4>
                    <button
                      onClick={() => setFormData({
                        ...formData,
                        commonRooms: { ...formData.commonRooms, enabled: !formData.commonRooms.enabled }
                      })}
                      className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                        formData.commonRooms.enabled
                          ? 'bg-red-600 text-white'
                          : 'bg-gray-200 text-gray-700'
                      }`}
                    >
                      {formData.commonRooms.enabled ? 'Aktiv' : 'Inaktiv'}
                    </button>
                  </div>

                  {formData.commonRooms.enabled && (
                    <div>
                      <label className="block mb-2 text-sm">Intervall</label>
                      <div className="grid grid-cols-1 gap-2">
                        {[
                          { id: 'weekly', label: 'wöchentlich' },
                          { id: 'monthly', label: 'monatlich' },
                        ].map((interval) => (
                          <button
                            key={interval.id}
                            onClick={() => setFormData({
                              ...formData,
                              commonRooms: { ...formData.commonRooms, interval: interval.id }
                            })}
                            className={`p-2 rounded-lg border-2 transition-all text-sm ${
                              formData.commonRooms.interval === interval.id
                                ? 'border-red-600 bg-white'
                                : 'border-gray-200 hover:border-red-600 bg-white'
                            }`}
                          >
                            {interval.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Basement */}
                <div className="bg-gray-50 p-5 rounded-2xl">
                  <div className="flex items-center justify-between mb-4">
                    <h4>Keller</h4>
                    <button
                      onClick={() => setFormData({
                        ...formData,
                        basement: { ...formData.basement, enabled: !formData.basement.enabled }
                      })}
                      className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                        formData.basement.enabled
                          ? 'bg-red-600 text-white'
                          : 'bg-gray-200 text-gray-700'
                      }`}
                    >
                      {formData.basement.enabled ? 'Aktiv' : 'Inaktiv'}
                    </button>
                  </div>

                  {formData.basement.enabled && (
                    <div>
                      <label className="block mb-2 text-sm">Intervall</label>
                      <div className="grid grid-cols-1 gap-2">
                        {[
                          { id: 'monthly', label: 'monatlich' },
                          { id: 'quarterly', label: 'vierteljährlich' },
                        ].map((interval) => (
                          <button
                            key={interval.id}
                            onClick={() => setFormData({
                              ...formData,
                              basement: { ...formData.basement, interval: interval.id }
                            })}
                            className={`p-2 rounded-lg border-2 transition-all text-sm ${
                              formData.basement.interval === interval.id
                                ? 'border-red-600 bg-white'
                                : 'border-gray-200 hover:border-red-600 bg-white'
                            }`}
                          >
                            {interval.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Attic */}
                <div className="bg-gray-50 p-5 rounded-2xl">
                  <div className="flex items-center justify-between mb-4">
                    <h4>Dachboden</h4>
                    <button
                      onClick={() => setFormData({
                        ...formData,
                        attic: { ...formData.attic, enabled: !formData.attic.enabled }
                      })}
                      className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                        formData.attic.enabled
                          ? 'bg-red-600 text-white'
                          : 'bg-gray-200 text-gray-700'
                      }`}
                    >
                      {formData.attic.enabled ? 'Aktiv' : 'Inaktiv'}
                    </button>
                  </div>

                  {formData.attic.enabled && (
                    <div>
                      <label className="block mb-2 text-sm">Intervall</label>
                      <div className="grid grid-cols-1 gap-2">
                        {[
                          { id: 'monthly', label: 'monatlich' },
                          { id: 'quarterly', label: 'vierteljährlich' },
                        ].map((interval) => (
                          <button
                            key={interval.id}
                            onClick={() => setFormData({
                              ...formData,
                              attic: { ...formData.attic, interval: interval.id }
                            })}
                            className={`p-2 rounded-lg border-2 transition-all text-sm ${
                              formData.attic.interval === interval.id
                                ? 'border-red-600 bg-white'
                                : 'border-gray-200 hover:border-red-600 bg-white'
                            }`}
                          >
                            {interval.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setStep(formData.services.includes('hausmeister') ? 4 : 3)}
                  className="flex-1 px-6 py-4 rounded-xl border-2 border-gray-200 hover:bg-gray-50 transition-colors"
                >
                  Zurück
                </button>
                <button
                  onClick={() => setStep(6)}
                  className="flex-1 px-6 py-4 rounded-xl bg-red-600 text-white hover:bg-red-700 transition-colors"
                >
                  Weiter
                </button>
              </div>
            </div>
          )}

          {/* Skip Step 5 if no Cleaning */}
          {step === 5 && !formData.services.includes('reinigung') && (
            <div>
              {(() => {
                setStep(6);
                return null;
              })()}
            </div>
          )}

          {/* Step 6: Additional Service Details */}
          {step === 6 && (
            <div>
              <h3 className="mb-6 text-center">Weitere Details</h3>

              <div className="space-y-6">
                {/* Outdoor Maintenance */}
                {formData.services.includes('aussenanlage') && (
                  <div className="bg-gray-50 p-5 rounded-2xl">
                    <h4 className="mb-4 flex items-center gap-2">
                      <Trash2 className="w-5 h-5 text-red-600" />
                      Außenanlagenpflege
                    </h4>

                    <div className="mb-4">
                      <label className="block mb-3 text-sm">Intervall</label>
                      <div className="grid grid-cols-1 gap-2">
                        {[
                          { id: 'weekly', label: '1× pro Woche' },
                          { id: 'biweekly', label: '2× im Monat' },
                          { id: 'monthly', label: '1× im Monat' },
                        ].map((interval) => (
                          <button
                            key={interval.id}
                            onClick={() => setFormData({ ...formData, outdoorInterval: interval.id })}
                            className={`p-3 rounded-xl border-2 transition-all text-sm ${
                              formData.outdoorInterval === interval.id
                                ? 'border-red-600 bg-white'
                                : 'border-gray-200 hover:border-red-600 bg-white'
                            }`}
                          >
                            {interval.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block mb-3 text-sm">Tiefgarage vorhanden?</label>
                      <div className="grid grid-cols-2 gap-3">
                        <button
                          onClick={() => setFormData({ ...formData, hasUndergroundGarage: 'yes' })}
                          className={`p-3 rounded-xl border-2 transition-all ${
                            formData.hasUndergroundGarage === 'yes'
                              ? 'border-red-600 bg-white'
                              : 'border-gray-200 hover:border-red-600 bg-white'
                          }`}
                        >
                          Ja
                        </button>
                        <button
                          onClick={() => setFormData({ ...formData, hasUndergroundGarage: 'no' })}
                          className={`p-3 rounded-xl border-2 transition-all ${
                            formData.hasUndergroundGarage === 'no'
                              ? 'border-red-600 bg-white'
                              : 'border-gray-200 hover:border-red-600 bg-white'
                          }`}
                        >
                          Nein
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Garden Details */}
                {formData.services.includes('garten') && (
                  <div className="bg-gray-50 p-5 rounded-2xl">
                    <h4 className="mb-4 flex items-center gap-2">
                      <TreePine className="w-5 h-5 text-red-600" />
                      Gartenpflege
                    </h4>

                    <div className="mb-4">
                      <label className="block mb-3 text-sm">Größe Grünfläche</label>
                      <div className="grid grid-cols-2 gap-2">
                        {['bis 100 m²', '100–300 m²', '300–500 m²', 'über 500 m²'].map((area) => (
                          <button
                            key={area}
                            onClick={() => setFormData({ ...formData, greenArea: area })}
                            className={`p-3 rounded-xl border-2 transition-all text-sm ${
                              formData.greenArea === area
                                ? 'border-red-600 bg-white'
                                : 'border-gray-200 hover:border-red-600 bg-white'
                            }`}
                          >
                            {area}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="mb-4">
                      <label className="block mb-3 text-sm">Anzahl Bäume / Sträucher: {formData.treesAndShrubs}</label>
                      <input
                        type="range"
                        min="0"
                        max="50"
                        value={formData.treesAndShrubs}
                        onChange={(e) => setFormData({ ...formData, treesAndShrubs: parseInt(e.target.value) })}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-red-600"
                      />
                    </div>

                    <div>
                      <label className="block mb-3 text-sm">Rasenfläche</label>
                      <div className="grid grid-cols-2 gap-2">
                        {['bis 100 m²', '100–300 m²', '300–500 m²', 'über 500 m²'].map((area) => (
                          <button
                            key={area}
                            onClick={() => setFormData({ ...formData, lawnArea: area })}
                            className={`p-3 rounded-xl border-2 transition-all text-sm ${
                              formData.lawnArea === area
                                ? 'border-red-600 bg-white'
                                : 'border-gray-200 hover:border-red-600 bg-white'
                            }`}
                          >
                            {area}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Winter Service */}
                {formData.services.includes('winter') && (
                  <div className="bg-gray-50 p-5 rounded-2xl">
                    <h4 className="mb-4 flex items-center gap-2">
                      <Snowflake className="w-5 h-5 text-red-600" />
                      Winterdienst
                    </h4>

                    <div className="mb-4">
                      <label className="block mb-3 text-sm">Zufahrten vorhanden?</label>
                      <div className="grid grid-cols-2 gap-3">
                        <button
                          onClick={() => setFormData({ ...formData, hasAccessRoads: 'yes' })}
                          className={`p-3 rounded-xl border-2 transition-all ${
                            formData.hasAccessRoads === 'yes'
                              ? 'border-red-600 bg-white'
                              : 'border-gray-200 hover:border-red-600 bg-white'
                          }`}
                        >
                          Ja
                        </button>
                        <button
                          onClick={() => setFormData({ ...formData, hasAccessRoads: 'no' })}
                          className={`p-3 rounded-xl border-2 transition-all ${
                            formData.hasAccessRoads === 'no'
                              ? 'border-red-600 bg-white'
                              : 'border-gray-200 hover:border-red-600 bg-white'
                          }`}
                        >
                          Nein
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block mb-3 text-sm">Öffentliche Gehwege angrenzend?</label>
                      <div className="grid grid-cols-2 gap-3">
                        <button
                          onClick={() => setFormData({ ...formData, hasPublicSidewalks: 'yes' })}
                          className={`p-3 rounded-xl border-2 transition-all ${
                            formData.hasPublicSidewalks === 'yes'
                              ? 'border-red-600 bg-white'
                              : 'border-gray-200 hover:border-red-600 bg-white'
                          }`}
                        >
                          Ja
                        </button>
                        <button
                          onClick={() => setFormData({ ...formData, hasPublicSidewalks: 'no' })}
                          className={`p-3 rounded-xl border-2 transition-all ${
                            formData.hasPublicSidewalks === 'no'
                              ? 'border-red-600 bg-white'
                              : 'border-gray-200 hover:border-red-600 bg-white'
                          }`}
                        >
                          Nein
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Waste Management Option */}
                <div className="bg-gray-50 p-5 rounded-2xl">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="flex items-center gap-2">
                      <Trash2 className="w-5 h-5 text-red-600" />
                      Mülltonnenmanagement
                    </h4>
                    <button
                      onClick={() => setFormData({
                        ...formData,
                        wasteManagement: { ...formData.wasteManagement, enabled: !formData.wasteManagement.enabled }
                      })}
                      className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                        formData.wasteManagement.enabled
                          ? 'bg-red-600 text-white'
                          : 'bg-gray-200 text-gray-700'
                      }`}
                    >
                      {formData.wasteManagement.enabled ? 'Aktiv' : 'Inaktiv'}
                    </button>
                  </div>

                  {formData.wasteManagement.enabled && (
                    <button
                      onClick={() => setStep(7)}
                      className="w-full p-3 rounded-xl border-2 border-red-600 bg-red-50 text-red-600 hover:bg-red-100 transition-colors flex items-center justify-between"
                    >
                      <span>Mülltonnen konfigurieren</span>
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  )}
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setStep(formData.services.includes('reinigung') ? 5 : (formData.services.includes('hausmeister') ? 4 : 3))}
                  className="flex-1 px-6 py-4 rounded-xl border-2 border-gray-200 hover:bg-gray-50 transition-colors"
                >
                  Zurück
                </button>
                <button
                  onClick={() => setStep(formData.wasteManagement.enabled ? 7 : 8)}
                  className="flex-1 px-6 py-4 rounded-xl bg-red-600 text-white hover:bg-red-700 transition-colors"
                >
                  Weiter
                </button>
              </div>
            </div>
          )}

          {/* Step 7: Waste Management Details */}
          {step === 7 && formData.wasteManagement.enabled && (
            <div>
              <h3 className="mb-6 text-center">Mülltonnenmanagement Details</h3>

              <div className="space-y-4">
                <div className="bg-gray-50 p-5 rounded-2xl">
                  <h4 className="mb-3 text-sm">Biotonne (fix: wöchentlich)</h4>
                  <div className="bg-green-50 border border-green-200 p-3 rounded-lg text-sm text-green-800">
                    Wöchentliche Leerung
                  </div>
                </div>

                <div className="bg-gray-50 p-5 rounded-2xl">
                  <h4 className="mb-3 text-sm">Gelbe Tonne (fix: 2-wöchentlich)</h4>
                  <div className="bg-yellow-50 border border-yellow-200 p-3 rounded-lg text-sm text-yellow-800">
                    Leerung alle 2 Wochen
                  </div>
                </div>

                <div className="bg-gray-50 p-5 rounded-2xl">
                  <h4 className="mb-3 text-sm">Papiertonne (Blau)</h4>
                  <div className="grid grid-cols-1 gap-2">
                    {[
                      { id: 'monthly', label: 'monatlich (1×)' },
                      { id: 'bimonthly', label: '2× im Monat' },
                      { id: 'quarterly', label: '4× im Jahr' },
                    ].map((interval) => (
                      <button
                        key={interval.id}
                        onClick={() => setFormData({
                          ...formData,
                          wasteManagement: { ...formData.wasteManagement, blueInterval: interval.id }
                        })}
                        className={`p-3 rounded-xl border-2 transition-all text-sm ${
                          formData.wasteManagement.blueInterval === interval.id
                            ? 'border-red-600 bg-white'
                            : 'border-gray-200 hover:border-red-600 bg-white'
                        }`}
                      >
                        {interval.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="bg-gray-50 p-5 rounded-2xl">
                  <h4 className="mb-3 text-sm">Restmülltonne (Schwarz)</h4>
                  <div className="grid grid-cols-1 gap-2">
                    {[
                      { id: 'weekly', label: '1× pro Woche' },
                      { id: 'biweekly-twice', label: '2× pro Woche' },
                      { id: 'bimonthly', label: '2× im Monat' },
                    ].map((interval) => (
                      <button
                        key={interval.id}
                        onClick={() => setFormData({
                          ...formData,
                          wasteManagement: { ...formData.wasteManagement, blackInterval: interval.id }
                        })}
                        className={`p-3 rounded-xl border-2 transition-all text-sm ${
                          formData.wasteManagement.blackInterval === interval.id
                            ? 'border-red-600 bg-white'
                            : 'border-gray-200 hover:border-red-600 bg-white'
                        }`}
                      >
                        {interval.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="bg-gray-50 p-5 rounded-2xl">
                  <div className="flex items-center justify-between mb-4">
                    <h4>Mülltonnenreinigung</h4>
                    <button
                      onClick={() => setFormData({
                        ...formData,
                        wasteManagement: {
                          ...formData.wasteManagement,
                          cleaning: { ...formData.wasteManagement.cleaning, enabled: !formData.wasteManagement.cleaning.enabled }
                        }
                      })}
                      className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                        formData.wasteManagement.cleaning.enabled
                          ? 'bg-red-600 text-white'
                          : 'bg-gray-200 text-gray-700'
                      }`}
                    >
                      {formData.wasteManagement.cleaning.enabled ? 'Aktiv' : 'Inaktiv'}
                    </button>
                  </div>

                  {formData.wasteManagement.cleaning.enabled && (
                    <div>
                      <label className="block mb-2 text-sm">Intervall</label>
                      <div className="grid grid-cols-1 gap-2">
                        {[
                          { id: 'monthly', label: 'monatlich' },
                          { id: 'quarterly', label: 'vierteljährlich' },
                          { id: 'biannual', label: 'halbjährlich' },
                        ].map((interval) => (
                          <button
                            key={interval.id}
                            onClick={() => setFormData({
                              ...formData,
                              wasteManagement: {
                                ...formData.wasteManagement,
                                cleaning: { ...formData.wasteManagement.cleaning, interval: interval.id }
                              }
                            })}
                            className={`p-2 rounded-lg border-2 transition-all text-sm ${
                              formData.wasteManagement.cleaning.interval === interval.id
                                ? 'border-red-600 bg-white'
                                : 'border-gray-200 hover:border-red-600 bg-white'
                            }`}
                          >
                            {interval.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setStep(6)}
                  className="flex-1 px-6 py-4 rounded-xl border-2 border-gray-200 hover:bg-gray-50 transition-colors"
                >
                  Zurück
                </button>
                <button
                  onClick={() => setStep(8)}
                  className="flex-1 px-6 py-4 rounded-xl bg-red-600 text-white hover:bg-red-700 transition-colors"
                >
                  Weiter
                </button>
              </div>
            </div>
          )}

          {/* Step 8: Contact Information */}
          {step === 8 && (
            <div>
              <h3 className="mb-6 text-center">Ihre Kontaktdaten</h3>
              <p className="text-sm text-gray-600 mb-6 text-center">
                Um Ihnen den genauen Preis anzuzeigen, benötigen wir Ihre Kontaktdaten
              </p>

              <div className="space-y-4 mb-6">
                <div>
                  <label htmlFor="name" className="block text-sm mb-2">Name *</label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-red-600 outline-none transition-colors"
                    placeholder="Ihr Name"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm mb-2">Telefonnummer *</label>
                  <input
                    type="tel"
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-red-600 outline-none transition-colors"
                    placeholder="+49 123 456 789"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm mb-2">E-Mail *</label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-red-600 outline-none transition-colors"
                    placeholder="ihre.email@beispiel.de"
                  />
                </div>

                <div>
                  <label htmlFor="address" className="block text-sm mb-2">Adresse der Liegenschaft *</label>
                  <input
                    type="text"
                    id="address"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    required
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-red-600 outline-none transition-colors"
                    placeholder="Straße, PLZ, Stadt"
                  />
                  {formData.address && !validateAddress(formData.address) && (
                    <p className="text-sm text-amber-600 mt-2">
                      Bitte geben Sie eine vollständige Adresse mit Postleitzahl ein.
                    </p>
                  )}
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setStep(formData.wasteManagement.enabled ? 7 : 6)}
                  className="flex-1 px-6 py-4 rounded-xl border-2 border-gray-200 hover:bg-gray-50 transition-colors"
                >
                  Zurück
                </button>
                <button
                  onClick={() => isContactComplete() && formData.serviceType === 'permanent' && setStep(9)}
                  disabled={!isContactComplete() || formData.serviceType !== 'permanent'}
                  className="flex-1 px-6 py-4 rounded-xl bg-red-600 text-white hover:bg-red-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                >
                  {formData.serviceType === 'permanent' ? 'Weiter' : 'Zum Ergebnis'}
                </button>
              </div>

              {formData.serviceType === 'one-time' && isContactComplete() && (
                <button
                  onClick={() => setStep(10)}
                  className="w-full mt-3 px-6 py-4 rounded-xl bg-red-600 text-white hover:bg-red-700 transition-colors"
                >
                  Zum Ergebnis
                </button>
              )}
            </div>
          )}

          {/* Step 9: Contract Duration (only for permanent service) */}
          {step === 9 && formData.serviceType === 'permanent' && (
            <div>
              <h3 className="mb-6 text-center">Vertragslaufzeit wählen</h3>
              <p className="text-sm text-gray-600 mb-6 text-center">
                Längere Laufzeiten erhalten höhere Rabatte
              </p>

              <div className="space-y-4">
                {[
                  { months: 6, discount: '0%', label: '6 Monate' },
                  { months: 12, discount: '5%', label: '12 Monate' },
                  { months: 24, discount: '10%', label: '24 Monate' },
                ].map((option) => (
                  <button
                    key={option.months}
                    onClick={() => setFormData({ ...formData, contractDuration: option.months })}
                    className={`w-full p-5 rounded-2xl border-2 transition-all ${
                      formData.contractDuration === option.months
                        ? 'border-red-600 bg-red-50'
                        : 'border-gray-200 hover:border-red-600'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="text-left">
                        <div className="mb-1">{option.label}</div>
                        <div className="text-sm text-gray-600">
                          {option.discount !== '0%' && `${option.discount} Rabatt`}
                          {option.discount === '0%' && 'Flexibel und kurzfristig'}
                        </div>
                      </div>
                      {option.discount !== '0%' && (
                        <div className="bg-green-100 text-green-800 px-3 py-1 rounded-lg text-sm">
                          {option.discount}
                        </div>
                      )}
                    </div>
                  </button>
                ))}
              </div>

              <div className="flex gap-3 mt-8">
                <button
                  onClick={() => setStep(8)}
                  className="flex-1 px-6 py-4 rounded-xl border-2 border-gray-200 hover:bg-gray-50 transition-colors"
                >
                  Zurück
                </button>
                <button
                  onClick={() => setStep(10)}
                  className="flex-1 px-6 py-4 rounded-xl bg-red-600 text-white hover:bg-red-700 transition-colors"
                >
                  Zum Ergebnis
                </button>
              </div>
            </div>
          )}

          {/* Step 10: Result */}
          {step === 10 && (
            <div>
              <h3 className="mb-6 text-center">Ihr individuelles Servicepaket</h3>

              {/* Price Display */}
              <div className="bg-gradient-to-br from-red-600 to-red-700 text-white p-8 rounded-2xl mb-6 text-center">
                {isAllServicesSelected && (
                  <div className="inline-block bg-white/20 px-4 py-1 rounded-full text-sm mb-3">
                    🎯 Rundum-Sorglos-Paket
                  </div>
                )}
                {isContactComplete() ? (
                  <>
                    <div className="text-sm opacity-90 mb-2">
                      {formData.serviceType === 'permanent' ? 'Monatliche Kosten' : 'Einmaliger Preis'}
                    </div>
                    <div className="text-4xl mb-2">
                      {calculatePrice().min}€ – {calculatePrice().max}€
                    </div>
                    {formData.serviceType === 'permanent' && (
                      <div className="text-sm opacity-90">
                        {formData.contractDuration} Monate Laufzeit
                        {formData.contractDuration === 24 && ' (10% Rabatt)'}
                        {formData.contractDuration === 12 && ' (5% Rabatt)'}
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    <div className="text-sm opacity-90 mb-2">Preis gesperrt</div>
                    <div className="text-2xl mb-2">🔒</div>
                    <div className="text-sm opacity-90">
                      Bitte füllen Sie alle Kontaktdaten aus
                    </div>
                  </>
                )}
              </div>

              {/* Selected Services */}
              <div className="bg-gray-50 p-5 rounded-2xl mb-6">
                <h4 className="mb-4">Ihre gewählten Leistungen:</h4>
                <div className="space-y-2">
                  {formData.services.includes('hausmeister') && (
                    <div className="flex items-center gap-2 text-sm">
                      <Check className="w-4 h-4 text-green-600" />
                      <span>Hausmeisterservice Gebäude</span>
                    </div>
                  )}
                  {formData.services.includes('reinigung') && (
                    <div className="flex items-center gap-2 text-sm">
                      <Check className="w-4 h-4 text-green-600" />
                      <span>Innenreinigung</span>
                    </div>
                  )}
                  {formData.services.includes('garten') && (
                    <div className="flex items-center gap-2 text-sm">
                      <Check className="w-4 h-4 text-green-600" />
                      <span>Gartenpflege</span>
                    </div>
                  )}
                  {formData.services.includes('aussenanlage') && (
                    <div className="flex items-center gap-2 text-sm">
                      <Check className="w-4 h-4 text-green-600" />
                      <span>Außenanlagenpflege</span>
                    </div>
                  )}
                  {formData.services.includes('winter') && (
                    <div className="flex items-center gap-2 text-sm">
                      <Check className="w-4 h-4 text-green-600" />
                      <span>Winterdienst</span>
                    </div>
                  )}
                  {formData.wasteManagement.enabled && (
                    <div className="flex items-center gap-2 text-sm">
                      <Check className="w-4 h-4 text-green-600" />
                      <span>Mülltonnenmanagement</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Notice */}
              <div className="bg-blue-50 border border-blue-200 p-4 rounded-xl mb-6">
                <p className="text-sm text-blue-900">
                  <strong>Hinweis:</strong> Der finale Preis wird nach kostenlosem Vor-Ort-Termin bestätigt.
                  Für ein verbindliches Angebot prüfen wir die Liegenschaft kostenlos vor Ort.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  onClick={downloadSummary}
                  className="w-full px-6 py-4 rounded-xl bg-white border-2 border-red-600 text-red-600 hover:bg-red-50 transition-colors flex items-center justify-center gap-2"
                >
                  <Download className="w-5 h-5" />
                  Konfiguration herunterladen
                </button>

                <button
                  onClick={() => submitRequest('angebot')}
                  disabled={submitting || !isContactComplete()}
                  className="w-full px-6 py-4 rounded-xl bg-white border-2 border-red-600 text-red-600 hover:bg-red-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
                >
                  <Mail className="w-5 h-5" />
                  {submitting ? 'Wird gesendet …' : 'Verbindliches Angebot anfordern'}
                </button>

                <button
                  onClick={() => submitRequest('besichtigung')}
                  disabled={submitting || !isContactComplete()}
                  className="w-full px-6 py-4 rounded-xl bg-red-600 text-white hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {submitting ? 'Wird gesendet …' : 'Kostenlosen Besichtigungstermin vereinbaren'}
                </button>
              </div>

              <div className="text-center text-sm text-gray-600 space-y-1 mt-4">
                <div className="flex items-center justify-center gap-2">
                  <Check className="w-4 h-4 text-green-600" />
                  <span>Antwort innerhalb 24h</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <Check className="w-4 h-4 text-green-600" />
                  <span>Kostenlos & unverbindlich</span>
                </div>
              </div>

              <button
                onClick={() => setStep(formData.serviceType === 'permanent' ? 9 : 8)}
                className="w-full mt-4 px-6 py-3 rounded-xl border-2 border-gray-200 hover:bg-gray-50 transition-colors"
              >
                Zurück
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
