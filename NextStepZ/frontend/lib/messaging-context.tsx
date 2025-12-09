'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import type { SavedPortfolio } from './saved-portfolio-context';

export type MessageType = 'text' | 'image' | 'portfolio';
export type MessageStatus = 'sending' | 'sent' | 'read';

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  content: string;
  type: MessageType;
  status: MessageStatus;
  timestamp: Date;
  imageUrl?: string;
  portfolioId?: string;
  portfolioTitle?: string;
  portfolioData?: SavedPortfolio;
}

export interface Conversation {
  id: string;
  participantId: string;
  participantName: string;
  participantAvatar: string;
  isOnline: boolean;
  lastMessage?: Message;
  unreadCount: number;
  createdAt: Date;
  messages: Message[];
}

interface MessagingContextType {
  conversations: Conversation[];
  selectedConversation: Conversation | null;
  isLoading: boolean;
  selectConversation: (conversationId: string) => void;
  sendMessage: (conversationId: string, content: string, type: MessageType, imageUrl?: string, portfolioId?: string, portfolioData?: SavedPortfolio) => Promise<void>;
  markAsRead: (conversationId: string) => void;
  markAllAsRead: () => void;
  searchConversations: (query: string) => Conversation[];
  createOrGetConversation: (participantId: string, participantName: string, participantAvatar: string) => void;
}

const MessagingContext = createContext<MessagingContextType | undefined>(undefined);

// Mock data for initial conversations
const mockConversations: Conversation[] = [
  {
    id: '1',
    participantId: 'user2',
    participantName: 'Nguyễn Văn A',
    participantAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    isOnline: true,
    unreadCount: 2,
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    messages: [
      {
        id: 'm1',
        conversationId: '1',
        senderId: 'currentUser',
        senderName: 'Bạn',
        senderAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
        content: 'Chào bạn!',
        type: 'text',
        status: 'read',
        timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      },
      {
        id: 'm2',
        conversationId: '1',
        senderId: 'user2',
        senderName: 'Nguyễn Văn A',
        senderAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
        content: 'Chào! Bạn khỏe không?',
        type: 'text',
        status: 'read',
        timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000 + 60000),
      },
      {
        id: 'm3',
        conversationId: '1',
        senderId: 'user2',
        senderName: 'Nguyễn Văn A',
        senderAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
        content: 'Bạn có thể giúp mình với dự án không?',
        type: 'text',
        status: 'sent',
        timestamp: new Date(Date.now() - 1 * 60 * 1000),
      },
    ],
  },
  {
    id: '2',
    participantId: 'user3',
    participantName: 'Trần Thị B',
    participantAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
    isOnline: false,
    unreadCount: 0,
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    messages: [
      {
        id: 'm4',
        conversationId: '2',
        senderId: 'currentUser',
        senderName: 'Bạn',
        senderAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
        content: 'Portfolio của bạn rất tuyệt vời!',
        type: 'text',
        status: 'read',
        timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      },
      {
        id: 'm5',
        conversationId: '2',
        senderId: 'user3',
        senderName: 'Trần Thị B',
        senderAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
        content: 'Cảm ơn bạn! 😊',
        type: 'text',
        status: 'read',
        timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000 + 120000),
      },
    ],
  },
  {
    id: '3',
    participantId: 'user4',
    participantName: 'Lê Văn C',
    participantAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
    isOnline: true,
    unreadCount: 0,
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
    messages: [
      {
        id: 'm6',
        conversationId: '3',
        senderId: 'user4',
        senderName: 'Lê Văn C',
        senderAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
        content: 'Mình muốn tìm hiểu về ReactJS',
        type: 'text',
        status: 'read',
        timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      },
    ],
  },
];

export const MessagingProvider = ({ children }: { children: React.ReactNode }) => {
  const [conversations, setConversations] = useState<Conversation[]>(mockConversations);
  const [selectedConversationId, setSelectedConversationId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Compute selectedConversation from conversations to ensure it's always in sync
  const selectedConversation = selectedConversationId
    ? conversations.find((c) => c.id === selectedConversationId) || null
    : null;

  const selectConversation = useCallback((conversationId: string) => {
    setSelectedConversationId(conversationId);
  }, []);

  const sendMessage = useCallback(
    async (
      conversationId: string,
      content: string,
      type: MessageType,
      imageUrl?: string,
      portfolioId?: string,
      portfolioData?: SavedPortfolio
    ) => {
      setIsLoading(true);
      try {
        // Simulate network delay
        await new Promise((resolve) => setTimeout(resolve, 500));

        const newMessage: Message = {
          id: Math.random().toString(36).substr(2, 9),
          conversationId,
          senderId: 'currentUser',
          senderName: 'Bạn',
          senderAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
          content,
          type,
          status: 'sent',
          timestamp: new Date(),
          imageUrl,
          portfolioId,
          portfolioTitle: portfolioData?.name || 'Portfolio của tôi',
          portfolioData,
        };

        setConversations((prev) =>
          prev.map((conv) => {
            if (conv.id === conversationId) {
              return {
                ...conv,
                lastMessage: newMessage,
                messages: [...conv.messages, newMessage],
              };
            }
            return conv;
          })
        );

        // Simulate message being read
        setTimeout(() => {
          setConversations((prev) =>
            prev.map((conv) => {
              if (conv.id === conversationId) {
                return {
                  ...conv,
                  messages: conv.messages.map((msg) =>
                    msg.id === newMessage.id ? { ...msg, status: 'read' as MessageStatus } : msg
                  ),
                };
              }
              return conv;
            })
          );
        }, 1500);

        // Simulate receiving a reply
        setTimeout(() => {
          const conversation = conversations.find((c) => c.id === conversationId);
          if (conversation) {
            const replyMessage: Message = {
              id: Math.random().toString(36).substr(2, 9),
              conversationId,
              senderId: conversation.participantId,
              senderName: conversation.participantName,
              senderAvatar: conversation.participantAvatar,
              content: 'Cảm ơn bạn! 😊',
              type: 'text',
              status: 'sent',
              timestamp: new Date(),
            };

            setConversations((prev) =>
              prev.map((conv) => {
                if (conv.id === conversationId) {
                  return {
                    ...conv,
                    lastMessage: replyMessage,
                    messages: [...conv.messages, replyMessage],
                  };
                }
                return conv;
              })
            );

            // Simulate reply being read
            setTimeout(() => {
              setConversations((prev) =>
                prev.map((conv) => {
                  if (conv.id === conversationId) {
                    return {
                      ...conv,
                      messages: conv.messages.map((msg) =>
                        msg.id === replyMessage.id ? { ...msg, status: 'read' as MessageStatus } : msg
                      ),
                    };
                  }
                  return conv;
                })
              );
            }, 1000);
          }
        }, 3000);
      } finally {
        setIsLoading(false);
      }
    },
    [conversations]
  );

  const markAsRead = useCallback((conversationId: string) => {
    setConversations((prev) =>
      prev.map((conv) => {
        if (conv.id === conversationId) {
          return {
            ...conv,
            unreadCount: 0,
            messages: conv.messages.map((msg) =>
              msg.senderId !== 'currentUser' ? { ...msg, status: 'read' as MessageStatus } : msg
            ),
          };
        }
        return conv;
      })
    );
  }, []);

  const markAllAsRead = useCallback(() => {
    setConversations((prev) =>
      prev.map((conv) => ({
        ...conv,
        unreadCount: 0,
        messages: conv.messages.map((msg) =>
          msg.senderId !== 'currentUser' ? { ...msg, status: 'read' as MessageStatus } : msg
        ),
      }))
    );
  }, []);

  const searchConversations = useCallback(
    (query: string) => {
      if (!query.trim()) return conversations;
      return conversations.filter((conv) =>
        conv.participantName.toLowerCase().includes(query.toLowerCase()) ||
        conv.lastMessage?.content.toLowerCase().includes(query.toLowerCase())
      );
    },
    [conversations]
  );

  const createOrGetConversation = useCallback(
    (participantId: string, participantName: string, participantAvatar: string) => {
      const existing = conversations.find((c) => c.participantId === participantId);
      if (existing) {
        selectConversation(existing.id);
      } else {
        const newConversation: Conversation = {
          id: Math.random().toString(36).substr(2, 9),
          participantId,
          participantName,
          participantAvatar,
          isOnline: false,
          unreadCount: 0,
          createdAt: new Date(),
          messages: [],
        };
        setConversations((prev) => [newConversation, ...prev]);
        selectConversation(newConversation.id);
      }
    },
    [conversations, selectConversation]
  );

  return (
    <MessagingContext.Provider
      value={{
        conversations,
        selectedConversation,
        isLoading,
        selectConversation,
        sendMessage,
        markAsRead,
        markAllAsRead,
        searchConversations,
        createOrGetConversation,
      }}
    >
      {children}
    </MessagingContext.Provider>
  );
};

export const useMessaging = () => {
  const context = useContext(MessagingContext);
  if (!context) {
    throw new Error('useMessaging must be used within MessagingProvider');
  }
  return context;
};
