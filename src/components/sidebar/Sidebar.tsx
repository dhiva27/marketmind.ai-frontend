'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';
import { useChat } from '@/hooks/useChat';
import { useAuthContext } from '@/context/AuthContext';
import {
  TrendingUp,
  SquarePen,
  Search,
  Library,
  Plug,
  FolderKanban,
  Code2,
  MoreHorizontal,
  Settings,
  User as UserIcon,
  HelpCircle,
  LogOut,
  Sparkles,
  ChevronRight,
  PanelLeftClose,
  PanelLeftOpen,
  Trash2,
  Edit2,
  Check,
  X,
  MessageSquare
} from 'lucide-react';
import { cn } from '@/lib/utils';

export function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const {
    chats,
    activeChatId,
    setActiveChatId,
    createNewChat,
    sidebarExpanded,
    toggleSidebarExpand,
    renameChat,
    deleteChat
  } = useChat();
  const { user, logout } = useAuthContext();

  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setProfileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const displayName = user?.displayName || user?.email?.split('@')[0] || 'Dhivakar';
  const email = user?.email || 'dhivakar@marketmind.ai';

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/login');
    } catch {
      // Fallback
    }
  };

  const handleStartRename = (id: string, currentTitle: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingId(id);
    setEditTitle(currentTitle);
  };

  const handleSaveRename = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (editTitle.trim()) {
      await renameChat(id, editTitle.trim());
    }
    setEditingId(null);
  };

  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    await deleteChat(id);
    setDeleteConfirmId(null);
  };

  const mainNavItems = [
    { id: 'new', icon: SquarePen, label: 'New chat', href: '/chat', action: () => { createNewChat(); router.push('/chat'); } },
    { id: 'library', icon: Library, label: 'Library', href: '/library' },
    { id: 'plugins', icon: Plug, label: 'Plugins', href: '/plugins' },
    { id: 'projects', icon: FolderKanban, label: 'Projects', href: '/projects' },
    { id: 'codex', icon: Code2, label: 'Codex', href: '/codex' },
    { id: 'more', icon: MoreHorizontal, label: 'More', href: '/search' },
  ];

  // Default sample recents if user has no chats yet
  const sampleRecents = [
    'MarketMind AI strategy',
    'Competitor analysis',
    'Marketing roadmap',
    'Startup validation',
    'Product launch strategy',
    'Customer research',
    'Pricing analysis',
  ];

  return (
    <aside
      className={cn(
        'fixed top-0 bottom-0 left-0 z-40 h-full bg-[#FFFFFF] border-r border-slate-200/80 flex flex-col justify-between select-none transition-all duration-300 shadow-sm',
        sidebarExpanded ? 'w-64 sm:w-72' : 'w-16 sm:w-[74px]'
      )}
    >
      {/* Top Section */}
      <div className="flex flex-col h-full min-h-0 overflow-hidden">
        {/* Header / Sidebar Toggle */}
        <div className="flex items-center justify-between p-3.5 sm:p-4 border-b border-slate-100">
          <Link
            href="/chat"
            className="flex items-center gap-2.5 text-[#0A0015] hover:opacity-90 transition-opacity min-w-0"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#7C3AED] to-[#A855F7] flex items-center justify-center text-white shadow-md shrink-0">
              <TrendingUp className="w-5 h-5 stroke-[2.5]" />
            </div>
            {sidebarExpanded && (
              <span className="font-bold text-base tracking-tight text-[#0A0015] truncate">
                MarketMind
              </span>
            )}
          </Link>

          <button
            onClick={toggleSidebarExpand}
            title={sidebarExpanded ? 'Collapse sidebar' : 'Expand sidebar'}
            className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors shrink-0"
          >
            {sidebarExpanded ? (
              <PanelLeftClose className="w-5 h-5 stroke-[1.75]" />
            ) : (
              <PanelLeftOpen className="w-5 h-5 stroke-[1.75]" />
            )}
          </button>
        </div>

        {/* Navigation List */}
        <div className="p-2 space-y-1 overflow-y-auto custom-scrollbar flex-1 min-h-0">
          {/* Main items matching Reference 2 */}
          {mainNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = item.id === 'new' ? pathname === '/chat' && !activeChatId : pathname === item.href;

            if (item.action) {
              return (
                <button
                  key={item.id}
                  onClick={item.action}
                  title={item.label}
                  className={cn(
                    'w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150',
                    isActive
                      ? 'bg-[#8B3DFF]/10 text-[#7C3AED] font-semibold'
                      : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                  )}
                >
                  <Icon className={cn('w-5 h-5 shrink-0', isActive ? 'text-[#7C3AED]' : 'text-slate-600')} />
                  {sidebarExpanded && <span>{item.label}</span>}
                </button>
              );
            }

            return (
              <Link
                key={item.id}
                href={item.href}
                title={item.label}
                className={cn(
                  'w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150',
                  isActive
                    ? 'bg-[#8B3DFF]/10 text-[#7C3AED] font-semibold'
                    : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                )}
              >
                <Icon className={cn('w-5 h-5 shrink-0', isActive ? 'text-[#7C3AED]' : 'text-slate-600')} />
                {sidebarExpanded && <span>{item.label}</span>}
              </Link>
            );
          })}

          {/* Recents Header & Recents List (Expanded only) */}
          {sidebarExpanded && (
            <div className="pt-4 space-y-1">
              <div className="px-3 py-1.5 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Recents
              </div>

              <div className="space-y-0.5 max-h-[320px] overflow-y-auto custom-scrollbar">
                {chats.length > 0 ? (
                  chats.map((chat) => {
                    const isSelected = activeChatId === chat.id;
                    const isEditing = editingId === chat.id;

                    return (
                      <div
                        key={chat.id}
                        onClick={() => {
                          setActiveChatId(chat.id);
                          router.push('/chat');
                        }}
                        className={cn(
                          'group relative flex items-center justify-between px-3 py-2 rounded-xl text-sm transition-colors cursor-pointer',
                          isSelected
                            ? 'bg-purple-50 text-[#7C3AED] font-medium'
                            : 'text-slate-700 hover:bg-slate-100'
                        )}
                      >
                        {isEditing ? (
                          <div className="flex items-center gap-1 w-full" onClick={(e) => e.stopPropagation()}>
                            <input
                              type="text"
                              value={editTitle}
                              onChange={(e) => setEditTitle(e.target.value)}
                              className="w-full px-2 py-0.5 text-xs bg-white border border-purple-300 rounded focus:outline-none text-slate-900"
                              autoFocus
                            />
                            <button
                              onClick={(e) => handleSaveRename(chat.id, e)}
                              className="p-1 text-emerald-600 hover:bg-emerald-50 rounded"
                            >
                              <Check className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={(e) => { e.stopPropagation(); setEditingId(null); }}
                              className="p-1 text-slate-400 hover:bg-slate-100 rounded"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ) : (
                          <>
                            <span className="truncate pr-6 text-xs sm:text-sm">{chat.title}</span>
                            <div className="absolute right-2 opacity-0 group-hover:opacity-100 flex items-center gap-1 bg-white/90 px-1 rounded shadow-xs transition-opacity">
                              <button
                                onClick={(e) => handleStartRename(chat.id, chat.title, e)}
                                className="p-1 text-slate-400 hover:text-slate-700 rounded"
                                title="Rename"
                              >
                                <Edit2 className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={(e) => handleDelete(chat.id, e)}
                                className="p-1 text-slate-400 hover:text-rose-600 rounded"
                                title="Delete"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </>
                        )}
                      </div>
                    );
                  })
                ) : (
                  sampleRecents.map((title, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        createNewChat();
                        router.push('/chat');
                      }}
                      className="w-full text-left px-3 py-2 rounded-xl text-xs sm:text-sm text-slate-600 hover:bg-slate-100 truncate transition-colors"
                    >
                      {title}
                    </button>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Profile Area & Dropdown Menu */}
      <div className="p-2 sm:p-3 border-t border-slate-100 relative" ref={menuRef}>
        <button
          onClick={() => setProfileMenuOpen(!profileMenuOpen)}
          className={cn(
            'w-full flex items-center gap-3 p-2 rounded-xl hover:bg-slate-100 transition-colors text-left',
            sidebarExpanded ? 'justify-between' : 'justify-center'
          )}
        >
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-amber-500 to-orange-500 text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-sm border border-white">
              {user?.photoURL ? (
                <Image src={user.photoURL} alt={displayName} width={36} height={36} className="object-cover rounded-full" />
              ) : (
                <span>{displayName.charAt(0).toUpperCase()}</span>
              )}
            </div>
            {sidebarExpanded && (
              <div className="min-w-0">
                <div className="font-medium text-sm text-slate-900 truncate">{displayName}</div>
                <div className="text-xs text-slate-500">Free</div>
              </div>
            )}
          </div>
          {sidebarExpanded && <ChevronRight className="w-4 h-4 text-slate-400 shrink-0" />}
        </button>

        {/* Profile Dropdown Menu matching Reference 3 */}
        {profileMenuOpen && (
          <div className="absolute bottom-16 left-3 w-64 bg-[#2A2A2A] text-white rounded-2xl p-2 shadow-2xl z-50 animate-fade-in-up text-sm space-y-1 border border-slate-700">
            {/* User Header */}
            <div className="flex items-center justify-between px-3 py-2 border-b border-slate-700">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-8 h-8 rounded-full bg-amber-500 text-white font-bold text-xs flex items-center justify-center shrink-0">
                  {displayName.charAt(0).toUpperCase()}
                </div>
                <div className="min-w-0">
                  <div className="font-semibold text-sm truncate">{displayName}</div>
                  <div className="text-xs text-slate-400">Free</div>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </div>

            {/* Menu Options */}
            <div className="py-1 space-y-0.5 text-slate-200">
              <button
                onClick={() => { setProfileMenuOpen(false); router.push('/settings'); }}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-slate-700 transition-colors text-left"
              >
                <Sparkles className="w-4 h-4 text-purple-400" />
                <span>Try Plus free</span>
              </button>
              <button
                onClick={() => { setProfileMenuOpen(false); router.push('/settings'); }}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-slate-700 transition-colors text-left"
              >
                <UserIcon className="w-4 h-4 text-slate-400" />
                <span>Personalization</span>
              </button>
              <Link
                href="/profile"
                onClick={() => setProfileMenuOpen(false)}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-slate-700 transition-colors text-left"
              >
                <UserIcon className="w-4 h-4 text-slate-400" />
                <span>Profile</span>
              </Link>
              <Link
                href="/settings"
                onClick={() => setProfileMenuOpen(false)}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-slate-700 transition-colors text-left"
              >
                <Settings className="w-4 h-4 text-slate-400" />
                <span>Settings</span>
              </Link>
            </div>

            <div className="pt-1 border-t border-slate-700 space-y-0.5">
              <Link
                href="/help"
                onClick={() => setProfileMenuOpen(false)}
                className="w-full flex items-center justify-between px-3 py-2 rounded-xl hover:bg-slate-700 transition-colors text-left"
              >
                <div className="flex items-center gap-3">
                  <HelpCircle className="w-4 h-4 text-slate-400" />
                  <span>Help</span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </Link>
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-slate-700 text-rose-400 transition-colors text-left"
              >
                <LogOut className="w-4 h-4 text-rose-400" />
                <span>Log out</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
