import { configureStore, createSlice } from '@reduxjs/toolkit';

// Auth slice for user authentication state
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    userType: null, // 'admin', 'student', 'university'
    isAuthenticated: false,
    loading: false
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action?.payload?.user;
      state.userType = action?.payload?.userType;
      state.isAuthenticated = true;
      state.loading = false;
    },
    clearUser: (state) => {
      state.user = null;
      state.userType = null;
      state.isAuthenticated = false;
      state.loading = false;
    },
    setLoading: (state, action) => {
      state.loading = action?.payload;
    }
  }
});

// Certificates slice for certificate management
const certificatesSlice = createSlice({
  name: 'certificates',
  initialState: {
    certificates: [],
    uploadQueue: [],
    verificationResults: [],
    loading: false,
    error: null
  },
  reducers: {
    setCertificates: (state, action) => {
      state.certificates = action?.payload;
    },
    addCertificate: (state, action) => {
      state?.certificates?.push(action?.payload);
    },
    updateCertificate: (state, action) => {
      const index = state?.certificates?.findIndex(cert => cert?.id === action?.payload?.id);
      if (index !== -1) {
        state.certificates[index] = action?.payload;
      }
    },
    removeCertificate: (state, action) => {
      state.certificates = state?.certificates?.filter(cert => cert?.id !== action?.payload);
    },
    addToUploadQueue: (state, action) => {
      state?.uploadQueue?.push(action?.payload);
    },
    removeFromUploadQueue: (state, action) => {
      state.uploadQueue = state?.uploadQueue?.filter(item => item?.id !== action?.payload);
    },
    clearUploadQueue: (state) => {
      state.uploadQueue = [];
    },
    setVerificationResults: (state, action) => {
      state.verificationResults = action?.payload;
    },
    addVerificationResult: (state, action) => {
      state?.verificationResults?.push(action?.payload);
    },
    setCertificatesLoading: (state, action) => {
      state.loading = action?.payload;
    },
    setCertificatesError: (state, action) => {
      state.error = action?.payload;
    }
  }
});

// UI slice for managing UI states
const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    sidebarOpen: true,
    activeTab: 'dashboard',
    theme: 'light',
    notifications: []
  },
  reducers: {
    toggleSidebar: (state) => {
      state.sidebarOpen = !state?.sidebarOpen;
    },
    setSidebarOpen: (state, action) => {
      state.sidebarOpen = action?.payload;
    },
    setActiveTab: (state, action) => {
      state.activeTab = action?.payload;
    },
    setTheme: (state, action) => {
      state.theme = action?.payload;
    },
    addNotification: (state, action) => {
      state?.notifications?.push({
        id: Date.now(),
        ...action?.payload
      });
    },
    removeNotification: (state, action) => {
      state.notifications = state?.notifications?.filter(notif => notif?.id !== action?.payload);
    },
    clearNotifications: (state) => {
      state.notifications = [];
    }
  }
});

// Export actions
export const { setUser, clearUser, setLoading } = authSlice?.actions;
export const { 
  setCertificates, 
  addCertificate, 
  updateCertificate, 
  removeCertificate,
  addToUploadQueue,
  removeFromUploadQueue,
  clearUploadQueue,
  setVerificationResults,
  addVerificationResult,
  setCertificatesLoading,
  setCertificatesError
} = certificatesSlice?.actions;
export const { 
  toggleSidebar, 
  setSidebarOpen, 
  setActiveTab, 
  setTheme,
  addNotification,
  removeNotification,
  clearNotifications
} = uiSlice?.actions;

// Configure and create store
const store = configureStore({
  reducer: {
    auth: authSlice?.reducer,
    certificates: certificatesSlice?.reducer,
    ui: uiSlice?.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE']
      }
    })
});

export { store };
export default store;