'use client';

import React, { useEffect, useRef } from 'react';
import { CheckCheck, Check } from 'lucide-react';
import Image from 'next/image';
import { useMessaging, ImagePreviewModal } from '@/components/messenger';
import PortfolioCard from './portfolio-card';
import { portfolioShareService } from '@/lib/services/portfolio-share-service';
import type { SavedPortfolio } from '@/lib/saved-portfolio-context';

export default function ChatArea(): React.ReactNode {
  const { selectedConversation } = useMessaging();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [previewImage, setPreviewImage] = React.useState<string | null>(null);
  const [isLoadingIndicatorVisible, setIsLoadingIndicatorVisible] = React.useState(false);
  const [confirmPortfolio, setConfirmPortfolio] = React.useState<SavedPortfolio | null>(null);

  const conversation = selectedConversation;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [conversation?.messages]);

  // Simulate typing indicator
  useEffect(() => {
    if (!conversation?.messages) return;

    const lastMessage = conversation.messages[conversation.messages.length - 1];
    if (lastMessage?.senderId !== 'currentUser' && lastMessage?.status === 'sent') {
      const timer = setTimeout(() => {
        setIsLoadingIndicatorVisible(true);
      }, 100);
      const clearTimer = setTimeout(() => {
        setIsLoadingIndicatorVisible(false);
      }, 2100);
      return () => {
        clearTimeout(timer);
        clearTimeout(clearTimer);
      };
    }
  }, [conversation?.messages]);

  if (!conversation) {
    return (
      <div className="flex-1 flex items-center justify-center bg-linear-to-br from-slate-950 via-slate-900 to-slate-800">
        <div className="text-center">
          <div className="w-16 h-16 rounded-full bg-cyan-500/10 flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">💬</span>
          </div>
          <p
            className="text-gray-400 text-lg"
            style={{ fontFamily: "'Exo 2 Medium', sans-serif" }}
          >
            Chọn một cuộc trò chuyện
          </p>
          <p
            className="text-gray-500 text-sm mt-2"
            style={{ fontFamily: "'Poppins Regular', sans-serif" }}
          >
            Chọn bạn để bắt đầu nhắn tin
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-linear-to-br from-slate-950 via-slate-900 to-slate-800 overflow-hidden">
      {/* Header */}
      <div className="shrink-0 p-3 md:p-4 border-b border-slate-700 bg-slate-900/50 backdrop-blur-xl z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 md:gap-3 flex-1 min-w-0">
            <div className="relative w-8 h-8 md:w-10 md:h-10 rounded-full overflow-hidden border-2 border-slate-700 shrink-0">
              <Image
                src={conversation.participantAvatar}
                alt={conversation.participantName}
                fill
                className="object-cover"
              />
            </div>
            <div className="min-w-0 flex-1">
              <h3
                className="font-semibold text-white text-sm md:text-base truncate"
                style={{ fontFamily: "'Exo 2 Medium', sans-serif" }}
              >
                {conversation.participantName}
              </h3>
              <p
                className={`text-xs ${
                  conversation.isOnline ? 'text-green-400' : 'text-gray-400'
                }`}
                style={{ fontFamily: "'Poppins Regular', sans-serif" }}
              >
                {conversation.isOnline ? '● Đang hoạt động' : '○ Ngoại tuyến'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="messages-scroll flex-1 overflow-y-auto overflow-x-hidden p-3 md:p-4 space-y-3 md:space-y-4">
        {conversation.messages.length > 0 ? (
          <>
            {conversation.messages.map((message, index) => {
              const isCurrentUser = message.senderId === 'currentUser';
              const showAvatar =
                index === 0 ||
                conversation.messages[index - 1]?.senderId !== message.senderId;

              return (
                <div
                  key={message.id}
                  className={`flex gap-2 md:gap-3 ${isCurrentUser ? 'justify-end' : 'justify-start'}`}
                >
                  {/* Avatar */}
                  {!isCurrentUser && (
                    <div className="shrink-0">
                      {showAvatar ? (
                        <div className="avatar-small relative rounded-full overflow-hidden border border-slate-700">
                          <Image
                            src={message.senderAvatar}
                            alt={message.senderName}
                            fill
                            className="object-cover"
                          />
                        </div>
                      ) : (
                        <div className="avatar-small" />
                      )}
                    </div>
                  )}

                  {/* Message Bubble */}
                  <div
                    className={`flex flex-col gap-1 message-bubble ${
                      isCurrentUser ? 'items-end' : 'items-start'
                    }`}
                  >
                    <div
                      className={`px-3 md:px-4 py-2 rounded-2xl wrap-break-word text-sm md:text-base ${
                        isCurrentUser
                          ? 'bg-linear-to-r from-cyan-500 to-blue-500 text-white'
                          : 'bg-slate-800 text-gray-100'
                      }`}
                    >
                      {message.type === 'text' && (
                        <p
                          className="text-sm md:text-base"
                          style={{ fontFamily: "'Poppins Regular', sans-serif" }}
                        >
                          {message.content}
                        </p>
                      )}

                      {message.type === 'image' && message.imageUrl && (
                        <button
                          onClick={() => setPreviewImage(message.imageUrl || null)}
                          className="relative w-40 h-40 md:w-48 md:h-48 rounded-lg overflow-hidden cursor-pointer hover:opacity-90 transition-opacity"
                        >
                          <Image
                            src={message.imageUrl}
                            alt="Shared image"
                            fill
                            className="object-cover"
                          />
                        </button>
                      )}

                      {message.type === 'portfolio' && message.portfolioData && (
                        <PortfolioCard
                          portfolio={message.portfolioData}
                          onView={(portfolio) => setConfirmPortfolio(portfolio)}
                        />
                      )}
                    </div>

                    {/* Timestamp and Status */}
                    <div
                      className="flex items-center gap-1 text-xs text-gray-400 px-2"
                      style={{ fontFamily: "'Poppins Regular', sans-serif" }}
                    >
                      <span>
                        {message.timestamp.toLocaleTimeString('vi-VN', {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                      {isCurrentUser && (
                        <>
                          {message.status === 'read' ? (
                            <CheckCheck className="w-3 h-3 text-cyan-400" />
                          ) : (
                            <Check className="w-3 h-3 text-gray-400" />
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Typing Indicator */}
            {isLoadingIndicatorVisible && (
              <div className="flex gap-3 items-start">
                <div className="shrink-0">
                  <div className="relative w-8 h-8 rounded-full overflow-hidden border border-slate-700">
                    <Image
                      src={conversation.participantAvatar}
                      alt={conversation.participantName}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="flex items-center gap-1 px-4 py-2 rounded-2xl bg-slate-800">
                  {[0, 1, 2].map((i) => (
                    <div
                      key={i}
                      className="w-2 h-2 bg-gray-400 rounded-full"
                    />
                  ))}
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="w-16 h-16 rounded-full bg-cyan-500/10 flex items-center justify-center mb-4">
              <span className="text-3xl">👋</span>
            </div>
            <p
              className="text-gray-400 text-lg"
              style={{ fontFamily: "'Exo 2 Medium', sans-serif" }}
            >
              Bắt đầu cuộc trò chuyện
            </p>
            <p
              className="text-gray-500 text-sm mt-2"
              style={{ fontFamily: "'Poppins Regular', sans-serif" }}
            >
              Hãy gửi tin nhắn đầu tiên
            </p>
          </div>
        )}
      </div>

      {/* Image Preview Modal */}
      {previewImage && (
        <ImagePreviewModal
          imageUrl={previewImage}
          onClose={() => setPreviewImage(null)}
        />
      )}

      {/* Confirm Dialog for Opening Full Portfolio */}
      {confirmPortfolio && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 rounded-lg border border-slate-700 shadow-2xl p-6 max-w-sm w-full">
            <h2 className="text-lg font-semibold text-white mb-2" style={{ fontFamily: "'Exo 2 SemiBold', sans-serif" }}>
              Mở hồ sơ đầy đủ
            </h2>
            <p className="text-slate-300 mb-6" style={{ fontFamily: "'Exo 2 Regular', sans-serif" }}>
              Bạn sẽ được chuyển đến trang xem hồ sơ "{confirmPortfolio.name}". Tiếp tục?
            </p>
            
            <div className="flex gap-3">
              <button
                onClick={() => setConfirmPortfolio(null)}
                className="flex-1 px-4 py-2 rounded-lg border border-slate-700 text-slate-300 hover:bg-slate-800 transition-all font-medium"
                style={{ fontFamily: "'Exo 2 Medium', sans-serif" }}
              >
                Hủy
              </button>
              <button
                onClick={() => {
                  // Save portfolio data for sharing
                  portfolioShareService.saveForSharing(confirmPortfolio.id, confirmPortfolio);
                  
                  // Open in new tab
                  const portfolioUrl = `${window.location.origin}/shared-portfolio/${confirmPortfolio.id}`;
                  window.open(portfolioUrl, '_blank');
                  
                  setConfirmPortfolio(null);
                }}
                className="flex-1 px-4 py-2 rounded-lg bg-cyan-500/20 border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/30 hover:border-cyan-500/50 transition-all font-medium"
                style={{ fontFamily: "'Exo 2 Medium', sans-serif" }}
              >
                Xác nhận
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
