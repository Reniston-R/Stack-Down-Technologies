
"use client";

import { useEffect, useState, useRef } from 'react';
import '../admin.css';

export default function AdminPage() {
    const [activeSection, setActiveSection] = useState('dashboard');
    const chartRefs = useRef({});

    useEffect(() => {
        // We load Chart.js via CDN in layout, check if available
        if (typeof window !== 'undefined' && window.Chart) {
            initCharts();
        } else {
            // Poll for Chart
            const interval = setInterval(() => {
                if (typeof window !== 'undefined' && window.Chart) {
                    clearInterval(interval);
                    initCharts();
                }
            }, 100);
            return () => clearInterval(interval);
        }

        function initCharts() {

            // 1. Navigation Logic
            const navItems = document.querySelectorAll('.sidebar-nav .nav-item');
            const sections = document.querySelectorAll('.section');

            navItems.forEach(item => {
                item.addEventListener('click', (e) => {
                    e.preventDefault();

                    navItems.forEach(n => n.classList.remove('active'));
                    sections.forEach(s => s.classList.remove('active'));

                    item.classList.add('active');

                    const targetId = item.getAttribute('href').substring(1);
                    const targetSection = document.getElementById(targetId);
                    if (targetSection) {
                        targetSection.classList.add('active');
                    }
                });
            });

            // 2. Chart.js Common Options
            Chart.defaults.color = '#9499ab';
            Chart.defaults.font.family = "'Outfit', sans-serif";

            const commonMiniChartOptions = {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        enabled: true,
                        backgroundColor: 'rgba(20, 20, 28, 0.9)',
                        titleColor: '#fff',
                        bodyColor: '#9499ab',
                        borderColor: 'rgba(255,255,255,0.1)',
                        borderWidth: 1,
                        padding: 10,
                        displayColors: false,
                        callbacks: { title: () => null }
                    }
                },
                scales: {
                    x: { display: false },
                    y: { display: false, min: 0 }
                },
                elements: {
                    point: { radius: 0, hitRadius: 10, hoverRadius: 4 },
                    line: { borderWidth: 2, tension: 0.4 }
                },
                interaction: { mode: 'index', intersect: false }
            };

            const createGradient = (ctx, colorStart, colorEnd) => {
                const gradient = ctx.createLinearGradient(0, 0, 0, 70);
                gradient.addColorStop(0, colorStart);
                gradient.addColorStop(1, colorEnd);
                return gradient;
            };

            const createMiniChart = (id, data, hexColor) => {
                const canvas = document.getElementById(id);
                if (!canvas) return;
                const ctx = canvas.getContext('2d');

                let r = parseInt(hexColor.slice(1, 3), 16),
                    g = parseInt(hexColor.slice(3, 5), 16),
                    b = parseInt(hexColor.slice(5, 7), 16);

                const gradient = createGradient(ctx, `rgba(${r},${g},${b},0.2)`, `rgba(${r},${g},${b},0)`);

                new Chart(ctx, {
                    type: 'line',
                    data: {
                        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                        datasets: [{
                            data: data,
                            borderColor: hexColor,
                            backgroundColor: gradient,
                            fill: true
                        }]
                    },
                    options: commonMiniChartOptions
                });
            };

            // 3. Initialize Mini Charts for New Dashboard
            createMiniChart('chart-mrr', [38000, 39500, 39000, 41000, 40500, 42000, 42500], '#0055ff'); // Accent Blue
            createMiniChart('chart-agency', [50000, 50000, 55000, 55000, 68200, 68200, 68200], '#ffffff'); // White
            createMiniChart('chart-ai', [800, 850, 900, 880, 1100, 1150, 1200], '#3377ff'); // Light Blue

            // 4. DAU / MAU Large Chart (Analytics Section)
            const dauMauCanvas = document.getElementById('chart-daumau');
            if (dauMauCanvas) {
                const ctxDauMau = dauMauCanvas.getContext('2d');
                const gradientDau = createGradient(ctxDauMau, 'rgba(0, 85, 255, 0.4)', 'rgba(0, 85, 255, 0.0)');
                const gradientMau = createGradient(ctxDauMau, 'rgba(255, 255, 255, 0.1)', 'rgba(255, 255, 255, 0.0)');

                new Chart(ctxDauMau, {
                    type: 'line',
                    data: {
                        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
                        datasets: [
                            {
                                label: 'DAU (Daily Active Users)',
                                data: [4200, 4500, 4800, 5100, 5400, 5800, 6200],
                                borderColor: '#0055ff',
                                backgroundColor: gradientDau,
                                borderWidth: 3,
                                tension: 0.4,
                                fill: true
                            },
                            {
                                label: 'MAU (Monthly Active Users)',
                                data: [10500, 11200, 11800, 12100, 12400, 12800, 13500],
                                borderColor: '#ffffff',
                                backgroundColor: gradientMau,
                                borderWidth: 2,
                                tension: 0.4,
                                fill: true
                            }
                        ]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            legend: {
                                position: 'top',
                                labels: { usePointStyle: true, boxWidth: 8, color: '#9499ab' }
                            },
                            tooltip: {
                                mode: 'index',
                                intersect: false,
                                backgroundColor: 'rgba(20, 20, 28, 0.9)',
                                titleColor: '#fff',
                                bodyColor: '#9499ab',
                                borderColor: 'rgba(255,255,255,0.1)',
                                borderWidth: 1,
                                padding: 10
                            }
                        },
                        scales: {
                            x: { grid: { color: 'rgba(255,255,255,0.05)', drawBorder: false } },
                            y: { grid: { color: 'rgba(255,255,255,0.05)', drawBorder: false }, beginAtZero: true }
                        },
                        interaction: { mode: 'nearest', axis: 'x', intersect: false }
                    }
                });
            }

            // 5. Filter buttons logic
            const filterBars = document.querySelectorAll('.filter-bar');
            filterBars.forEach(bar => {
                const buttons = bar.querySelectorAll('button');
                buttons.forEach(btn => {
                    btn.addEventListener('click', () => {
                        buttons.forEach(b => b.classList.remove('active'));
                        btn.classList.add('active');
                    });
                });
            });

        }
    }, []);

    // Override the navigation click manually since React state is better
    useEffect(() => {
        const navItems = document.querySelectorAll('.sidebar-nav .nav-item');
        const sections = document.querySelectorAll('.section');

        const handleNavClick = (e) => {
            e.preventDefault();
            const targetId = e.currentTarget.getAttribute('href').substring(1);

            navItems.forEach(n => n.classList.remove('active'));
            sections.forEach(s => s.classList.remove('active'));

            e.currentTarget.classList.add('active');
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.classList.add('active');
            }
        };

        navItems.forEach(item => {
            item.addEventListener('click', handleNavClick);
        });

        return () => {
            navItems.forEach(item => {
                item.removeEventListener('click', handleNavClick);
            });
        }
    }, []);

    return (

        <div className="admin-layout">

            <aside className="sidebar">
                <div className="logo">
                    <span className="logo-text">Action Tech <span className="highlight">Wave</span></span>
                    <span className="logo-badge">HQ</span>
                </div>
                <nav className="sidebar-nav">
                    <a href="#dashboard" className="nav-item active"><i className="fas fa-chart-pie"></i> Home Dashboard</a>
                    <a href="#saas-users" className="nav-item"><i className="fas fa-users"></i> SaaS Workspaces</a>
                    <a href="#agency-clients" className="nav-item"><i className="fas fa-briefcase"></i> Agency Clients</a>
                    <a href="#billing" className="nav-item"><i className="fas fa-credit-card"></i> Billing & Revenue</a>
                    <a href="#ai-engine" className="nav-item"><i className="fas fa-brain"></i> AI & Automations</a>
                    <a href="#analytics" className="nav-item"><i className="fas fa-chart-line"></i> Usage Analytics</a>
                    <a href="#support" className="nav-item"><i className="fas fa-headset"></i> Support & Tickets</a>
                    <a href="#config" className="nav-item"><i className="fas fa-sliders-h"></i> Content & Control</a>
                    <a href="#logs" className="nav-item"><i className="fas fa-server"></i> System Health</a>
                    <a href="#team" className="nav-item"><i className="fas fa-user-shield"></i> Team & Access</a>
                </nav>
                <div className="sidebar-footer">
                    <a href="index.html" className="btn-sm btn-outline" style={{ width: "100%", textAlign: "center", display: "block", textDecoration: "none" }}>
                        <i className="fas fa-external-link-alt"></i> View Live Site
                    </a>
                </div>
            </aside>


            <main className="main-content">

                <header className="topbar">
                    <div className="topbar-search">
                        <i className="fas fa-search"></i>
                        <input type="text" placeholder="Search clients, workspaces, invoices..." />
                    </div>
                    <div className="topbar-profile">
                        <div className="notification-icon">
                            <i className="fas fa-bell"></i>
                            <span className="badge-dot"></span>
                        </div>
                        <div className="profile-avatar">
                            <img src="https://ui-avatars.com/api/?name=Admin&background=8b5cf6&color=fff" alt="Admin" />
                            <span>Super Admin</span>
                        </div>
                    </div>
                </header>

                <div className="section-container">


                    <div id="dashboard" className="section active">
                        <div className="section-header flex-between">
                            <div>
                                <h2>Home Dashboard</h2>
                                <p className="subtitle">Unified view of SaaS & Agency business</p>
                            </div>
                            <div className="quick-actions flex" style={{ gap: "10px" }}>
                                <button className="btn-sm btn-action"><i className="fas fa-file-invoice"></i> Create Invoice</button>
                                <button className="btn-sm btn-outline"><i className="fas fa-plus"></i> SaaS Workspace</button>
                                <button className="btn-sm btn-outline text-danger border-danger"><i className="fas fa-undo"></i> Refund</button>
                                <button className="btn-sm btn-outline"><i className="fas fa-toggle-on"></i> Feature Flag</button>
                            </div>
                        </div>

                        <div className="grid-cards">
                            <div className="metric-card">
                                <div className="metric-header"><span>SaaS MRR</span> <i className="fas fa-layer-group highlight"></i></div>
                                <div className="metric-value">₹35,00,000</div>
                                <div className="metric-trend trend-up"><i className="fas fa-arrow-up"></i> 12% vs last month</div>
                                <div className="mini-chart"><canvas id="chart-mrr"></canvas></div>
                            </div>
                            <div className="metric-card">
                                <div className="metric-header"><span>Agency Revenue (MTD)</span> <i className="fas fa-briefcase text-success"></i></div>
                                <div className="metric-value">₹56,00,000</div>
                                <div className="metric-trend trend-up"><i className="fas fa-arrow-up"></i> 3 Projects closed</div>
                                <div className="mini-chart"><canvas id="chart-agency"></canvas></div>
                            </div>
                            <div className="metric-card">
                                <div className="metric-header"><span>Active Clients (Agency)</span> <i className="fas fa-handshake text-warning"></i></div>
                                <div className="metric-value">18</div>
                                <div className="metric-trend trend-up"><i className="fas fa-arrow-up"></i> 2 new retainers</div>
                            </div>
                            <div className="metric-card">
                                <div className="metric-header"><span>SaaS Users</span> <i className="fas fa-users highlight"></i></div>
                                <div className="metric-value">12,450</div>
                                <div className="metric-trend trend-up"><i className="fas fa-arrow-up"></i> 145 today</div>
                            </div>
                            <div className="metric-card">
                                <div className="metric-header"><span>AI Credits (Today)</span> <i className="fas fa-brain highlight"></i></div>
                                <div className="metric-value">1.2M</div>
                                <div className="metric-trend trend-up"><i className="fas fa-arrow-up"></i> GPT/Claude usage high</div>
                                <div className="mini-chart"><canvas id="chart-ai"></canvas></div>
                            </div>
                            <div className="metric-card border-warning">
                                <div className="metric-header"><span>Open Tickets</span> <i className="fas fa-ticket-alt text-warning"></i></div>
                                <div className="metric-value">28</div>
                                <div className="metric-trend trend-down"><i className="fas fa-arrow-up"></i> 5 Urgent (MRR &gt; ₹40,000)</div>
                            </div>
                            <div className="metric-card border-danger">
                                <div className="metric-header"><span>Failed Payments</span> <i className="fas fa-exclamation-circle text-danger"></i></div>
                                <div className="metric-value">12</div>
                                <div className="metric-trend trend-down"><i className="fas fa-arrow-up"></i> ₹3,50,000 at risk</div>
                            </div>
                        </div>
                    </div>


                    <div id="saas-users" className="section">
                        <div className="section-header flex-between">
                            <div>
                                <h2>SaaS Users & Workspaces</h2>
                                <p className="subtitle">Product customers, trials, and upsells</p>
                            </div>
                            <div className="filter-bar">
                                <button className="active">All</button>
                                <button className="text-danger pulse-border"><i className="fas fa-fire"></i> Trial ending &lt; 3 days</button>
                                <button className="text-success"><i className="fas fa-arrow-up"></i> Upsell: High Usage Free</button>
                                <button>At Risk</button>
                            </div>
                        </div>

                        <div className="table-container">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Workspace / User</th>
                                        <th>Plan & MRR</th>
                                        <th>AI Credits (Used/Limit)</th>
                                        <th>Feature Usage %</th>
                                        <th>Last Active</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>
                                            <div className="font-bold">TechNova Inc.</div>
                                            <div className="text-xs text-secondary">alice@technova.io • Joined Jan 12</div>
                                        </td>
                                        <td><span className="badge badge-pro">Pro</span><br /><span className="text-sm mt-1 inline-block">₹24,999/mo</span></td>
                                        <td>
                                            <div className="text-sm">450K / 500K</div>
                                            <div className="progress-bar mt-1"><div className="progress-fill bg-warning" style={{ width: "90%" }}></div></div>
                                        </td>
                                        <td><span className="badge badge-success">85% (Healthy)</span></td>
                                        <td>2 hours ago</td>
                                        <td>
                                            <button className="btn-sm btn-action" title="Impersonate"><i className="fas fa-user-secret"></i></button>
                                            <button className="btn-sm btn-outline" title="Add Credits"><i className="fas fa-coins"></i></button>
                                            <button className="btn-sm btn-outline" title="API Logs"><i className="fas fa-code"></i></button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div className="font-bold">Startup Hub</div>
                                            <div className="text-xs text-secondary">bob@startuphub.co • Joined Mar 05</div>
                                        </td>
                                        <td><span className="badge badge-warning">Trial (Ends 2 days)</span><br /><span className="text-sm mt-1 inline-block">₹0</span></td>
                                        <td>
                                            <div className="text-sm">98K / 100K</div>
                                            <div className="progress-bar mt-1"><div className="progress-fill bg-danger" style={{ width: "98%" }}></div></div>
                                        </td>
                                        <td><span className="badge badge-warning">45% (Fair)</span></td>
                                        <td>1 day ago</td>
                                        <td>
                                            <button className="btn-sm btn-action" title="Impersonate"><i className="fas fa-user-secret"></i></button>
                                            <button className="btn-sm btn-outline text-success" title="Change Plan"><i className="fas fa-arrow-up"></i></button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div className="font-bold">FreeLoader LLC</div>
                                            <div className="text-xs text-secondary">info@freeloader.io • Joined Feb 14</div>
                                        </td>
                                        <td><span className="badge badge-free">Free</span><br /><span className="text-sm mt-1 inline-block">₹0</span></td>
                                        <td>
                                            <div className="text-sm">10K / 10K</div>
                                            <div className="progress-bar mt-1"><div className="progress-fill bg-danger" style={{ width: "100%" }}></div></div>
                                        </td>
                                        <td><span className="badge badge-success">95% (Ready to Upsell)</span></td>
                                        <td>Just now</td>
                                        <td>
                                            <button className="btn-sm btn-action" title="Impersonate"><i className="fas fa-user-secret"></i></button>
                                            <button className="btn-sm btn-outline text-danger" title="Pause"><i className="fas fa-pause"></i></button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>


                    <div id="agency-clients" className="section">
                        <div className="section-header">
                            <h2>Agency Clients & Projects</h2>
                            <p className="subtitle">High-ticket services, web dev, marketing</p>
                        </div>

                        <div className="table-container">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Client / Project</th>
                                        <th>Status</th>
                                        <th>Value / MRR</th>
                                        <th>PM Assigned</th>
                                        <th>India Compliance</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>
                                            <div className="font-bold">Global Finance UX Redesign</div>
                                            <div className="text-xs text-secondary">Client: Apex Bank Ltd</div>
                                        </td>
                                        <td><span className="badge badge-pro">In Progress (65%)</span></td>
                                        <td>₹37,00,000<br /><span className="text-xs text-secondary">One-time</span></td>
                                        <td>Sarah Jenkins</td>
                                        <td className="text-xs">GST: 27AADCB...<br />TDS: 10% Deducted</td>
                                        <td>
                                            <button className="btn-sm btn-action">Upload Deliverable</button>
                                            <button className="btn-sm btn-outline"><i className="fas fa-file-invoice"></i> Bill GST</button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div className="font-bold">SEO & Marketing Retainer</div>
                                            <div className="text-xs text-secondary">Client: NextGen Retail</div>
                                        </td>
                                        <td><span className="badge badge-success">Active Retainer</span></td>
                                        <td>₹3,75,000/mo<br /><span className="text-xs text-secondary">MRR</span></td>
                                        <td>Raj Patel</td>
                                        <td className="text-xs text-warning">UPI Mandate Pending</td>
                                        <td>
                                            <button className="btn-sm btn-outline">Log Report</button>
                                            <button className="btn-sm btn-outline text-warning">Start Support</button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div className="font-bold">AI Customer Agent Build</div>
                                            <div className="text-xs text-secondary">Client: MegaCorp Logistics</div>
                                        </td>
                                        <td><span className="badge badge-warning">Lead (Negotiating)</span></td>
                                        <td>₹1,00,00,000<br /><span className="text-xs text-secondary">Est. Value</span></td>
                                        <td>Unassigned</td>
                                        <td className="text-xs text-secondary">N/A</td>
                                        <td>
                                            <button className="btn-sm btn-action">Send Proposal</button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>


                    <div id="billing" className="section">
                        <div className="section-header">
                            <h2>Billing & Revenue</h2>
                            <p className="subtitle">Unified money view: Stripe + Razorpay + Tally export</p>
                        </div>

                        <div className="p-4 mb-4 rounded border border-danger bg-danger text-white flex-between" style={{ background: "rgba(239, 68, 68, 0.1)" }}>
                            <div>
                                <i className="fas fa-exclamation-triangle"></i>
                                <strong>URGENT:</strong> ₹2,00,000 MRR Client (Apex Bank) Card Failed on Stripe.
                            </div>
                            <button className="btn-sm btn-outline text-white"><i className="fab fa-whatsapp"></i> WhatsApp Client</button>
                        </div>

                        <div className="grid-cards" style={{ gridTemplateColumns: "repeat(4, 1fr)" }}>
                            <div className="metric-card">
                                <div className="metric-value">₹35L</div>
                                <div className="metric-header">SaaS MRR</div>
                            </div>
                            <div className="metric-card">
                                <div className="metric-value">₹15L</div>
                                <div className="metric-header">Agency Retainers</div>
                            </div>
                            <div className="metric-card">
                                <div className="metric-value">₹3.7Cr</div>
                                <div className="metric-header">One-time Projects (YTD)</div>
                            </div>
                            <div className="metric-card border-success">
                                <div className="metric-value text-success">₹1.2M</div>
                                <div className="metric-header">GST Collected (India)</div>
                            </div>
                        </div>

                        <div className="table-container">
                            <div className="table-header flex-between">
                                <h3>Recent Invoices & Transactions</h3>
                                <div>
                                    <button className="btn-sm btn-outline"><i className="fas fa-file-export"></i> Export to Tally</button>
                                </div>
                            </div>
                            <table>
                                <thead>
                                    <tr>
                                        <th>ID / Type</th>
                                        <th>Client / Gateway</th>
                                        <th>Amount</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><span className="font-bold">INV-SaaS-2026</span><br /><span className="text-xs text-secondary">Subscription</span></td>
                                        <td>TechNova (Stripe)</td>
                                        <td>₹24,999</td>
                                        <td><span className="badge badge-success">Paid</span></td>
                                    </tr>
                                    <tr>
                                        <td><span className="font-bold">INV-AGY-992</span><br /><span className="text-xs text-secondary">Milestone 1</span></td>
                                        <td>Apex Bank (Razorpay)</td>
                                        <td>₹4,50,000</td>
                                        <td><span className="badge badge-warning">Pending NEFT</span></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>


                    <div id="ai-engine" className="section">
                        <div className="section-header">
                            <h2>AI & Automations Engine</h2>
                            <p className="subtitle">Manage API costs, limits, and workflows</p>
                        </div>

                        <div className="grid-cards">
                            <div className="metric-card">
                                <div className="metric-header">Total API Calls (Today)</div>
                                <div className="metric-value">4.2M</div>
                                <div className="metric-trend trend-up"><i className="fas fa-arrow-up"></i> 18%</div>
                            </div>
                            <div className="metric-card">
                                <div className="metric-header">OpenAI / Claude Cost</div>
                                <div className="metric-value text-danger">₹1,00,000</div>
                                <div className="metric-trend trend-down"><i className="fas fa-arrow-up"></i> Watch margins</div>
                            </div>
                            <div className="metric-card border-danger">
                                <div className="metric-header">Failed Runs</div>
                                <div className="metric-value text-danger">45</div>
                                <div className="metric-trend"><button className="btn-sm btn-outline text-xs">Re-run All</button></div>
                            </div>
                        </div>

                        <div className="table-container">
                            <div className="table-header"><h3>Top Workspaces by AI Usage</h3></div>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Workspace / MRR</th>
                                        <th>Credits Used</th>
                                        <th>Most Used Automation</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>ContentGenius (₹80,000/mo)</td>
                                        <td><span className="text-danger font-bold">1.8M</span> / 2M Limit</td>
                                        <td>Blog Writer (GPT-4o)</td>
                                        <td>
                                            <button className="btn-sm btn-action">Rate Limit</button>
                                            <button className="btn-sm btn-outline"><i className="fas fa-award"></i> Pitch Case Study</button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Global Finance (Agency)</td>
                                        <td>450K / ∞</td>
                                        <td>Data Extraction (Claude 3.5)</td>
                                        <td>
                                            <button className="btn-sm btn-outline">View Prompt Logs</button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>


                    <div id="analytics" className="section">
                        <div className="section-header">
                            <h2>Usage Analytics</h2>
                            <p className="subtitle">Find what keeps users paying & agency profitable</p>
                        </div>

                        <div className="grid-cards" style={{ gridTemplateColumns: "2fr 1fr" }}>
                            <div className="table-container mb-0 p-4">
                                <h3>SaaS: DAU / MAU</h3>
                                <div style={{ height: "250px", marginTop: "15px" }}><canvas id="chart-daumau"></canvas></div>
                            </div>
                            <div className="table-container mb-0 p-4">
                                <h3>Agency Performance</h3>
                                <div className="mt-4">
                                    <div className="mb-3">
                                        <div className="flex-between text-sm text-secondary">Projects on Time</div>
                                        <div className="font-bold text-success text-xl">92%</div>
                                    </div>
                                    <div className="mb-3">
                                        <div className="flex-between text-sm text-secondary">Avg Project Margin</div>
                                        <div className="font-bold highlight text-xl">64%</div>
                                    </div>
                                    <div>
                                        <div className="flex-between text-sm text-secondary">Service → SaaS Conv.</div>
                                        <div className="font-bold text-xl">18%</div>
                                        <div className="text-xs text-secondary mt-1">Clients upgrading to own tools</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div id="support" className="section">
                        <div className="section-header">
                            <h2>Support & Tickets</h2>
                            <p className="subtitle">Rule: ₹40,000+ MRR gets answered first</p>
                        </div>

                        <div className="table-container">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Tag / Priority</th>
                                        <th>Customer / Context</th>
                                        <th>Issue</th>
                                        <th>Last User Events</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr style={{ background: "rgba(139, 92, 246, 0.05)" }}>
                                        <td><span className="badge badge-danger">VIP SLA</span><br /><span className="badge badge-pro mt-1">₹80,000 MRR (SaaS)</span></td>
                                        <td>MegaCorp Logistics</td>
                                        <td className="font-bold">Webhook failing since 2AM</td>
                                        <td className="text-xs font-mono text-secondary">
                                            &gt; POST /api/v1/webhook (500)<br />
                                            &gt; POST /api/v1/webhook (500)<br />
                                            &gt; Opened Ticket
                                        </td>
                                        <td><button className="btn-sm btn-action">Reply First (Slack)</button></td>
                                    </tr>
                                    <tr>
                                        <td><span className="badge badge-warning">High</span><br /><span className="badge badge-free mt-1">Lead (₹16L Est)</span></td>
                                        <td>NextGen Retail (Agency)</td>
                                        <td className="font-bold">Need revision on homepage design</td>
                                        <td className="text-xs font-mono text-secondary">
                                            &gt; Viewed figma link<br />
                                            &gt; Emailed project manager
                                        </td>
                                        <td><button className="btn-sm btn-outline">Assign to PM</button></td>
                                    </tr>
                                    <tr>
                                        <td><span className="badge badge-free">Low</span><br /><span className="badge badge-free mt-1">Free Tier</span></td>
                                        <td>Hobbyist</td>
                                        <td className="font-bold">How to center a div in site builder?</td>
                                        <td className="text-xs font-mono text-secondary">
                                            &gt; Dragged element (failed)<br />
                                            &gt; Searched docs: "center"
                                        </td>
                                        <td><button className="btn-sm btn-outline">Send Doc Link</button></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>


                    <div id="config" className="section">
                        <div className="section-header">
                            <h2>Content & Feature Control</h2>
                            <p className="subtitle">Change stuff without bugging devs</p>
                        </div>

                        <div className="grid-cards">
                            <div className="table-container p-4">
                                <h3>Feature Flags & Rollouts</h3>
                                <div className="flex-between mt-4 pb-3 border-b">
                                    <div>
                                        <div className="font-bold">AI Logo Generator V2</div>
                                        <div className="text-xs text-secondary">Only for ₹8,000+ Pro plans</div>
                                    </div>
                                    <label className="switch"><input type="checkbox" defaultChecked /><span className="slider round"></span></label>
                                </div>
                                <div className="flex-between mt-3 pb-3 border-b">
                                    <div>
                                        <div className="font-bold">Claude 3.5 Sonnet Integration</div>
                                        <div className="text-xs text-secondary">Default routing for complex tasks</div>
                                    </div>
                                    <label className="switch"><input type="checkbox" defaultChecked /><span className="slider round"></span></label>
                                </div>
                                <div className="flex-between mt-3">
                                    <div>
                                        <div className="font-bold">App Banner (Global)</div>
                                        <div className="text-xs text-secondary">"Scheduled maintenance Sunday 2AM"</div>
                                    </div>
                                    <label className="switch"><input type="checkbox" /><span className="slider round"></span></label>
                                </div>
                            </div>

                            <div className="table-container p-4">
                                <h3>Agency Portfolio & Pricing</h3>
                                <div className="form-group mt-3">
                                    <label className="text-sm text-secondary">SaaS Pro Plan Base Price (₹)</label>
                                    <input type="text" defaultValue="24999" className="form-control mt-1 w-full p-2 rounded" />
                                </div>
                                <div className="mt-4">
                                    <button className="btn-sm btn-outline w-full mb-2"><i className="fas fa-image"></i> Add Agency Portfolio Case Study</button>
                                    <button className="btn-sm btn-outline w-full"><i className="fas fa-envelope"></i> Edit Onboarding Email Templates</button>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div id="logs" className="section">
                        <div className="section-header">
                            <h2>System Health & Logs</h2>
                            <p className="subtitle">Don't get a 2AM call from AWS</p>
                        </div>

                        <div className="grid-cards" style={{ gridTemplateColumns: "repeat(5, 1fr)" }}>
                            <div className="metric-card text-center p-3">
                                <div className="text-xs text-secondary mb-1">API Latency</div>
                                <div className="font-bold text-success text-xl">120ms</div>
                            </div>
                            <div className="metric-card text-center p-3">
                                <div className="text-xs text-secondary mb-1">Error Rate</div>
                                <div className="font-bold text-success text-xl">0.01%</div>
                            </div>
                            <div className="metric-card text-center p-3 border-warning">
                                <div className="text-xs text-warning mb-1">OpenAI API</div>
                                <div className="font-bold text-warning text-xl">Degraded</div>
                            </div>
                            <div className="metric-card text-center p-3">
                                <div className="text-xs text-secondary mb-1">Razorpay</div>
                                <div className="font-bold text-success text-xl">Operational</div>
                            </div>
                            <div className="metric-card text-center p-3 border-danger">
                                <div className="text-xs text-danger mb-1">GST API (Gov)</div>
                                <div className="font-bold text-danger text-xl">Down</div>
                            </div>
                        </div>

                        <div className="table-container p-4">
                            <div className="terminal bg-black p-4 rounded font-mono text-sm text-success overflow-y-auto" style={{ height: "250px" }}>
                                <div>[2026-04-24 16:30:10] INFO: Background job 'sync_stripe_plans' completed (240ms)</div>
                                <div>[2026-04-24 16:30:12] SUCCESS: Webhook ID=wk_8912 delivered to Global Finance</div>
                                <div className="text-warning">[2026-04-24 16:30:15] WARN: UPI Mandate generation failed for Client_42 (Razorpay timeout)</div>
                                <div className="text-danger">[2026-04-24 16:30:16] ERROR: India NIC GST API unreachable. Invoices queued.</div>
                                <div className="text-danger">[2026-04-24 16:30:20] ERROR: OpenAI RateLimitExceeded on Workspace=ContentGenius</div>
                                <div className="animate-pulse">_</div>
                            </div>
                        </div>
                    </div>


                    <div id="team" className="section">
                        <div className="section-header flex-between">
                            <div>
                                <h2>Team & Access Control</h2>
                                <p className="subtitle">Your CA ≠ Your Intern ≠ Your Co-founder</p>
                            </div>
                            <button className="btn-sm btn-action"><i className="fas fa-plus"></i> Invite User</button>
                        </div>

                        <div className="grid-cards" style={{ gridTemplateColumns: "2fr 1fr" }}>
                            <div className="table-container mb-0">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>User</th>
                                            <th>Role</th>
                                            <th>2FA</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>
                                                <div className="font-bold">Super Admin (You)</div>
                                                <div className="text-xs text-secondary">admin@actiontechwave.com</div>
                                            </td>
                                            <td><span className="badge badge-danger">Owner</span></td>
                                            <td><i className="fas fa-shield-alt text-success"></i></td>
                                            <td>-</td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div className="font-bold">Ramesh (CA)</div>
                                                <div className="text-xs text-secondary">finance@actiontechwave.com</div>
                                            </td>
                                            <td><span className="badge badge-warning">Finance</span></td>
                                            <td><i className="fas fa-shield-alt text-success"></i></td>
                                            <td><button className="btn-sm btn-outline">Edit</button></td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div className="font-bold">Freelance Dev</div>
                                            </td>
                                            <td><span className="badge badge-free">Developer (Sandbox)</span></td>
                                            <td><i className="fas fa-times-circle text-danger"></i></td>
                                            <td><button className="btn-sm btn-outline">Edit</button></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <div className="table-container mb-0 p-4">
                                <h3>Audit Log (Non-negotiable)</h3>
                                <div className="text-sm mt-3">
                                    <div className="py-2 border-b border-glass">
                                        <div className="font-bold text-danger">Refund Issued (₹24,999)</div>
                                        <div className="text-xs text-secondary">Super Admin • 10 mins ago</div>
                                    </div>
                                    <div className="py-2 border-b border-glass">
                                        <div className="font-bold text-warning">Deleted Workspace</div>
                                        <div className="text-xs text-secondary">Super Admin • 1 hour ago</div>
                                    </div>
                                    <div className="py-2">
                                        <div className="font-bold text-success">Updated Pricing Plan</div>
                                        <div className="text-xs text-secondary">Super Admin • Yesterday</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </main>
        </div>



    );
}
