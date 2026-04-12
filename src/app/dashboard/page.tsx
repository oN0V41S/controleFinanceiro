// src/app/dashboard/page.tsx
'use client';

import React, { useState } from 'react';
import { DashboardLayout } from '@/features/dashboard/components/DashboardLayout';
import { Sidebar } from '@/features/dashboard/components/Sidebar';
import { HeaderLayout } from '@/features/dashboard/components/HeaderLayout';
import { MobileNavBar } from '@/features/dashboard/components/MobileNavBar';
import { MobileDrawer } from '@/features/dashboard/components/MobileDrawer';

export default function DashboardPage() {
    const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

    return (
        <DashboardLayout>
            {/* Sidebar - Navigation - Hidden on mobile, visible on desktop */}
            <Sidebar />

            {/* Main Content Area */}
            <div className="flex flex-col min-h-screen bg-background pb-16 md:pb-0">
                {/* Header with Search, AI, Notifications, Profile + Mobile Menu Button */}
                <HeaderLayout onOpenMobileDrawer={() => setMobileDrawerOpen(true)} />

                {/* Dashboard Content */}
                <main className="flex-1 p-6">
                    <div className="max-w-6xl mx-auto">
                        {/* Dashboard content will be rendered here */}
                    </div>
                </main>
            </div>

            {/* Mobile Navigation Bar - Only visible on mobile */}
            <MobileNavBar />

            {/* Mobile Drawer - Navigation overlay for mobile (more options) */}
            <MobileDrawer 
                open={mobileDrawerOpen} 
                onClose={() => setMobileDrawerOpen(false)} 
            />
        </DashboardLayout>
    );
}