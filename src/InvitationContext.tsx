import { createContext, useContext, useState, type ReactNode } from 'react';

export type TemplateModel = 'ethereal-gold' | 'midnight-noir' | 'botanical-glass';

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
  template: 'ethereal-gold'
};

const InvitationContext = createContext<InvitationContextType | undefined>(undefined);

export const InvitationProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<InvitationData>(DEFAULT_DATA);

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
