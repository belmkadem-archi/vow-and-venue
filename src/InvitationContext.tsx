import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

export type TemplateModel = 'garden' | 'golden' | 'rose' | 'ivory';

export interface TimelineItem {
  time: string;
  title: string;
  description: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface GiftInfo {
  message: string;
  bankName?: string;
  accountHolder?: string;
  iban?: string;
}

export interface InvitationData {
  hostNames: string;
  eventTitle: string;
  date: string;
  time: string;
  venue: string;
  mapsLink: string;
  soundtrack: string;
  personalMessage: string;
  template: TemplateModel;
  // EternalVows Expanded Fields
  timeline_items: TimelineItem[];
  faq_items: FAQItem[];
  gift_info: GiftInfo;
  dress_code: string;
  rsvp_deadline: string;
  hostEmail: string;
}

interface InvitationContextType {
  data: InvitationData;
  updateData: (updates: Partial<InvitationData>) => void;
  resetData: () => void;
}

const DEFAULT_DATA: InvitationData = {
  hostNames: 'Alex & Jordan',
  eventTitle: 'Our Wedding Day',
  date: '2026-06-21',
  time: '18:00',
  venue: 'The Grand Pavilion',
  mapsLink: 'https://maps.google.com',
  soundtrack: 'Nocturne in Eb Major',
  personalMessage: 'We can\'t wait to share this beautiful day with you.',
  template: 'garden',
  timeline_items: [
    { time: '17:00', title: 'Ceremony', description: 'Exchange of vows at the gazebo' },
    { time: '18:30', title: 'Cocktails', description: 'Drinks and appetizers on the lawn' },
    { time: '20:00', title: 'Dinner', description: 'Grand banquet in the pavilion' }
  ],
  faq_items: [
    { question: 'Is there a dress code?', answer: 'Yes, please join us in Black Tie optional attire.' },
    { question: 'Is there parking available?', answer: 'Yes, free valet parking is provided at the venue entrance.' }
  ],
  gift_info: {
    message: 'Your presence is the greatest gift. If you wish to contribute, a donation to our honeymoon would be appreciated.',
    bankName: 'Global Heritage Bank',
    accountHolder: 'Alex & Jordan',
    iban: 'US00 0000 0000 0000 0000'
  },
  dress_code: 'Black Tie Optional',
  rsvp_deadline: '2026-05-15',
  hostEmail: ''
};

const STORAGE_KEY = 'vow_and_venue_builder_data';

const InvitationContext = createContext<InvitationContextType | undefined>(undefined);

export const InvitationProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<InvitationData>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : DEFAULT_DATA;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [data]);

  const updateData = (updates: Partial<InvitationData>) => {
    setData(prev => ({ ...prev, ...updates }));
  };

  const resetData = () => setData(DEFAULT_DATA);

  return (
    <InvitationContext.Provider value={{ data, updateData, resetData }}>
      {children}
    </InvitationContext.Provider>
  );
};

export const useInvitation = () => {
  const context = useContext(InvitationContext);
  if (!context) {
    throw new Error('useInvitation must be used within an InvitationProvider');
  }
  return context;
};
