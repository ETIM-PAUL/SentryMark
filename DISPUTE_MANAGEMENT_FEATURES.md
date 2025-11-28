# Dispute Management Page - Feature Documentation

## Overview
A comprehensive dispute management system for IP assets with blockchain integration. Features a stunning purple/gradient UI consistent with the SentryMark design system.

## ✨ Key Features

### 1. **Search & Display**
- Search disputes by ID with real-time validation
- Loading skeleton animations for better UX
- Detailed dispute card showing all relevant information
- Address shortening with "show full" toggle
- One-click copy to clipboard for all addresses

### 2. **Dispute Information Display**
The dispute card shows:
- Target IP ID (address)
- Dispute Initiator (address) 
- Dispute Timestamp (formatted date)
- Arbitration Policy (address)
- Dispute Evidence Hash (bytes32)
- Target Tag (bytes32)
- Current Tag (bytes32)
- Status Badge (Pending/Resolved/Cancelled/In Progress)

### 3. **Action Buttons** (4 Primary Actions)

#### 🔴 **Raise Dispute**
Opens modal with fields:
- Target IP ID (address)
- Dispute Evidence Hash (bytes32)
- Target Tag (dropdown with 4 options):
  - Improper Registration
  - Plagiarism
  - Copyright Violation
  - Unauthorized Use
- Data (bytes)
- Confirm button

#### 🟢 **Resolve Dispute**
Opens modal with fields:
- Dispute ID (uint256)
- Data (bytes)
- Confirm button

#### 🔵 **Set Judgement**
Opens modal with fields:
- Dispute ID (uint256)
- Decision (boolean - toggle between Approve/Reject)
- Data (bytes)
- Confirm button

#### ⚫ **Cancel Dispute**
Opens modal with fields:
- Dispute ID (uint256)
- Data (bytes)
- Warning message about irreversibility
- Confirm button

### 4. **Total Disputes Counter**
- Displayed in top-right corner
- Attractive gradient card design
- Updates dynamically when disputes are raised
- Shows total count with icon

### 5. **UI/UX Features**
- **Loading States**: Skeleton loaders during data fetch
- **Empty States**: Friendly message when no dispute selected
- **Toast Notifications**: Success/error messages for all actions
- **Responsive Design**: Works on mobile, tablet, and desktop
- **Modal System**: Clean, dismissible modals with backdrop
- **Gradient Buttons**: Color-coded by action type
- **Smooth Animations**: fadeIn effects, hover states
- **Form Validation**: Required field checking
- **Keyboard Support**: Enter key to search

## 🎨 Design System

### Color Scheme
- **Background**: Purple gradient (slate-900 → purple-900 → slate-900)
- **Cards**: Slate-800 with purple border glow
- **Primary Actions**: Purple to Pink gradient
- **Raise Dispute**: Orange to Red gradient
- **Resolve**: Green to Emerald gradient
- **Judgement**: Blue to Indigo gradient
- **Cancel**: Slate gradient
- **Status Badges**: Color-coded (Yellow=Pending, Green=Resolved, Red=Cancelled, Blue=In Progress)

### Typography
- **Headers**: Bold, large, gradient text
- **Body**: Slate colors for readability
- **Mono**: Font-mono for addresses and hashes
- **Icons**: Lucide React icons throughout

## 🔧 Technical Implementation

### State Management
```javascript
- disputeId (search input)
- isLoading (fetch state)
- disputeData (fetched dispute info)
- totalDisputes (counter)
- Modal visibility states (4 modals)
- Form states for each modal
```

### Components
- `Dispute_Management` (main component)
- `DisputeCard` (displays dispute details)
- `StatusBadge` (colored status indicator)
- `InfoRow` (reusable info display with copy)
- `DisputeLoadingSkeleton` (loading state)
- `Modal` (base modal component)
- `ResolveDisputeModal`
- `RaiseDisputeModal`
- `SetJudgementModal`
- `CancelDisputeModal`

### Features Used
- React hooks (useState)
- React Hot Toast for notifications
- Skeleton components from SkeletonLoader
- Lucide React icons
- Clipboard API for copy functionality
- Date formatting utilities

## 📱 Responsive Design
- Mobile: Single column, stacked buttons
- Tablet: 2-column grid
- Desktop: 4-column action buttons, 2-column info display

## 🚀 Future Enhancements
- Connect to actual blockchain contract
- Real-time dispute updates via WebSocket
- Dispute history timeline
- Advanced filtering and sorting
- Export dispute data
- Multi-signature approval workflow
- Dispute analytics dashboard

## 📝 Usage Example
1. Enter dispute ID in search box
2. Click "Fetch" or press Enter
3. View detailed dispute information
4. Use action buttons to manage dispute
5. Fill modal forms and confirm actions
6. Receive toast notification on success/error

## 🎯 Status
✅ Fully implemented and functional
✅ All modals working
✅ Form validation in place
✅ Responsive design complete
✅ Loading states implemented
✅ Toast notifications configured
