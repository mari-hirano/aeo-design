import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

// Types for the UI store
export interface Toast {
  id: string
  type: 'success' | 'error' | 'warning' | 'info'
  title: string
  message?: string
  duration?: number
}

export interface Modal {
  id: string
  type: string
  props?: Record<string, any>
  onClose?: () => void
}

export interface UIState {
  // Loading states
  isLoading: boolean
  loadingMessage?: string
  
  // Modal management
  modals: Modal[]
  
  // Toast notifications
  toasts: Toast[]
  
  // Panel states (can complement existing context)
  isCommandPaletteOpen: boolean
  isQuickActionsOpen: boolean
  
  // Theme and appearance
  sidebarCollapsed: boolean
  rightPanelCollapsed: boolean
  
  // Search and filter states
  globalSearchQuery: string
  globalSearchResults: any[]
  
  // Form states
  hasUnsavedChanges: boolean
  
  // Actions
  setLoading: (loading: boolean, message?: string) => void
  
  // Modal actions
  openModal: (modal: Omit<Modal, 'id'>) => string
  closeModal: (id: string) => void
  closeAllModals: () => void
  
  // Toast actions
  addToast: (toast: Omit<Toast, 'id'>) => string
  removeToast: (id: string) => void
  clearAllToasts: () => void
  
  // Panel actions
  toggleCommandPalette: () => void
  toggleQuickActions: () => void
  
  // Layout actions
  toggleSidebar: () => void
  toggleRightPanel: () => void
  setSidebarCollapsed: (collapsed: boolean) => void
  setRightPanelCollapsed: (collapsed: boolean) => void
  
  // Search actions
  setGlobalSearchQuery: (query: string) => void
  setGlobalSearchResults: (results: any[]) => void
  clearGlobalSearch: () => void
  
  // Form actions
  setUnsavedChanges: (hasChanges: boolean) => void
}

// Generate unique IDs
const generateId = () => Math.random().toString(36).substring(2, 15)

export const useUIStore = create<UIState>()(
  devtools(
    (set, get) => ({
      // Initial state
      isLoading: false,
      loadingMessage: undefined,
      modals: [],
      toasts: [],
      isCommandPaletteOpen: false,
      isQuickActionsOpen: false,
      sidebarCollapsed: false,
      rightPanelCollapsed: false,
      globalSearchQuery: '',
      globalSearchResults: [],
      hasUnsavedChanges: false,

      // Loading actions
      setLoading: (loading, message) =>
        set({ isLoading: loading, loadingMessage: message }, false, 'setLoading'),

      // Modal actions
      openModal: (modal) => {
        const id = generateId()
        const newModal = { ...modal, id }
        set(
          (state) => ({ modals: [...state.modals, newModal] }),
          false,
          'openModal'
        )
        return id
      },

      closeModal: (id) =>
        set(
          (state) => ({
            modals: state.modals.filter((modal) => {
              if (modal.id === id) {
                modal.onClose?.()
                return false
              }
              return true
            }),
          }),
          false,
          'closeModal'
        ),

      closeAllModals: () => {
        const { modals } = get()
        modals.forEach((modal) => modal.onClose?.())
        set({ modals: [] }, false, 'closeAllModals')
      },

      // Toast actions
      addToast: (toast) => {
        const id = generateId()
        const newToast = { ...toast, id }
        
        set(
          (state) => ({ toasts: [...state.toasts, newToast] }),
          false,
          'addToast'
        )

        // Auto-remove toast after duration (default 5 seconds)
        const duration = toast.duration ?? 5000
        if (duration > 0) {
          setTimeout(() => {
            get().removeToast(id)
          }, duration)
        }

        return id
      },

      removeToast: (id) =>
        set(
          (state) => ({ toasts: state.toasts.filter((toast) => toast.id !== id) }),
          false,
          'removeToast'
        ),

      clearAllToasts: () => set({ toasts: [] }, false, 'clearAllToasts'),

      // Panel actions
      toggleCommandPalette: () =>
        set(
          (state) => ({ isCommandPaletteOpen: !state.isCommandPaletteOpen }),
          false,
          'toggleCommandPalette'
        ),

      toggleQuickActions: () =>
        set(
          (state) => ({ isQuickActionsOpen: !state.isQuickActionsOpen }),
          false,
          'toggleQuickActions'
        ),

      // Layout actions
      toggleSidebar: () =>
        set(
          (state) => ({ sidebarCollapsed: !state.sidebarCollapsed }),
          false,
          'toggleSidebar'
        ),

      toggleRightPanel: () =>
        set(
          (state) => ({ rightPanelCollapsed: !state.rightPanelCollapsed }),
          false,
          'toggleRightPanel'
        ),

      setSidebarCollapsed: (collapsed) =>
        set({ sidebarCollapsed: collapsed }, false, 'setSidebarCollapsed'),

      setRightPanelCollapsed: (collapsed) =>
        set({ rightPanelCollapsed: collapsed }, false, 'setRightPanelCollapsed'),

      // Search actions
      setGlobalSearchQuery: (query) =>
        set({ globalSearchQuery: query }, false, 'setGlobalSearchQuery'),

      setGlobalSearchResults: (results) =>
        set({ globalSearchResults: results }, false, 'setGlobalSearchResults'),

      clearGlobalSearch: () =>
        set(
          { globalSearchQuery: '', globalSearchResults: [] },
          false,
          'clearGlobalSearch'
        ),

      // Form actions
      setUnsavedChanges: (hasChanges) =>
        set({ hasUnsavedChanges: hasChanges }, false, 'setUnsavedChanges'),
    }),
    {
      name: 'ui-store', // This will show up in Redux DevTools
    }
  )
)

// Selector hooks for better performance
export const useLoading = () => useUIStore((state) => state.isLoading)
export const useLoadingMessage = () => useUIStore((state) => state.loadingMessage)
export const useModals = () => useUIStore((state) => state.modals)
export const useToasts = () => useUIStore((state) => state.toasts)
export const useCommandPalette = () => useUIStore((state) => state.isCommandPaletteOpen)
export const useQuickActions = () => useUIStore((state) => state.isQuickActionsOpen)
export const useSidebarCollapsed = () => useUIStore((state) => state.sidebarCollapsed)
export const useRightPanelCollapsed = () => useUIStore((state) => state.rightPanelCollapsed)
export const useGlobalSearch = () => useUIStore((state) => ({
  query: state.globalSearchQuery,
  results: state.globalSearchResults,
}))
export const useUnsavedChanges = () => useUIStore((state) => state.hasUnsavedChanges)

// Action hooks
export const useUIActions = () => useUIStore((state) => ({
  setLoading: state.setLoading,
  openModal: state.openModal,
  closeModal: state.closeModal,
  closeAllModals: state.closeAllModals,
  addToast: state.addToast,
  removeToast: state.removeToast,
  clearAllToasts: state.clearAllToasts,
  toggleCommandPalette: state.toggleCommandPalette,
  toggleQuickActions: state.toggleQuickActions,
  toggleSidebar: state.toggleSidebar,
  toggleRightPanel: state.toggleRightPanel,
  setSidebarCollapsed: state.setSidebarCollapsed,
  setRightPanelCollapsed: state.setRightPanelCollapsed,
  setGlobalSearchQuery: state.setGlobalSearchQuery,
  setGlobalSearchResults: state.setGlobalSearchResults,
  clearGlobalSearch: state.clearGlobalSearch,
  setUnsavedChanges: state.setUnsavedChanges,
})) 