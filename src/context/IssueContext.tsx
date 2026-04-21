'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Issue, mockIssues, Volunteer, mockVolunteers } from '@/lib/mockData';

interface IssueContextType {
  issues: Issue[];
  volunteers: Volunteer[];
  addIssue: (issue: Issue) => void;
  updateIssueStatus: (id: string, status: Issue['status']) => void;
  assignVolunteer: (issueId: string, volunteerId: string) => void;
  resetData: () => void;
}

const IssueContext = createContext<IssueContextType | undefined>(undefined);

export const IssueProvider = ({ children }: { children: React.ReactNode }) => {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [volunteers, setVolunteers] = useState<Volunteer[]>([]);

  useEffect(() => {
    // Load from local storage or use mock data on first load
    const storedIssues = localStorage.getItem('helpmatch_issues');
    if (storedIssues) {
      setIssues(JSON.parse(storedIssues));
    } else {
      setIssues(mockIssues);
    }

    const storedVolunteers = localStorage.getItem('helpmatch_volunteers');
    if (storedVolunteers) {
      setVolunteers(JSON.parse(storedVolunteers));
    } else {
      setVolunteers(mockVolunteers);
    }
  }, []);

  useEffect(() => {
    if (issues.length > 0) {
      localStorage.setItem('helpmatch_issues', JSON.stringify(issues));
    }
    if (volunteers.length > 0) {
      localStorage.setItem('helpmatch_volunteers', JSON.stringify(volunteers));
    }
  }, [issues, volunteers]);

  const addIssue = (issue: Issue) => {
    setIssues(prev => [issue, ...prev]);
  };

  const updateIssueStatus = (id: string, status: Issue['status']) => {
    setIssues(prev => prev.map(i => i.id === id ? { ...i, status } : i));
  };

  const assignVolunteer = (issueId: string, volunteerId: string) => {
    // Update local issue status and assigned volunteer
    setIssues(prev => prev.map(i => 
      i.id === issueId ? { ...i, assignedVolunteerId: volunteerId, status: 'In Progress' } : i
    ));

    // Update volunteer's assigned tasks
    setVolunteers(prev => prev.map(v => 
      v.id === volunteerId ? { ...v, assignedTasks: [...new Set([...v.assignedTasks, issueId])] } : v
    ));
  };

  const resetData = () => {
    setIssues(mockIssues);
    setVolunteers(mockVolunteers);
    localStorage.removeItem('helpmatch_issues');
    localStorage.removeItem('helpmatch_volunteers');
    window.location.reload();
  };

  return (
    <IssueContext.Provider value={{ issues, volunteers, addIssue, updateIssueStatus, assignVolunteer, resetData }}>
      {children}
    </IssueContext.Provider>
  );
};

export const useIssues = () => {
  const context = useContext(IssueContext);
  if (!context) throw new Error('useIssues must be used within IssueProvider');
  return context;
};
