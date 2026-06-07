// --- assets/js/charts-handler.js ---

// Function to Initialize Dashboard Charts
window.initDashboardCharts = function() {
    const activityCanvas = document.getElementById('depositActivityCanvas');
    const flowCanvas = document.getElementById('commissionFlowCanvas');

    let activityChart = null;
    let flowChart = null;

    if (activityCanvas) {
        activityChart = new Chart(activityCanvas.getContext('2d'), {
            type: 'line',
            data: {
                labels: ['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
                datasets: [
                    { label: 'INR', data: [0,0,0,0,0,0,0], borderColor: '#3B82F6', tension: 0.3, fill: false },
                    { label: 'USDT', data: [0,0,0,0,0,0,0], borderColor: '#4ADE80', tension: 0.3, fill: false }
                ]
            },
            options: { 
                responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } },
                scales: {
                    y: { beginAtZero: true, grid: { borderDash: [5, 5], color: '#f3f4f6' }, ticks: { color: '#9CA3AF' } },
                    x: { grid: { display: false }, ticks: { color: '#9CA3AF' } }
                }
            }
        });
    }

    if (flowCanvas) {
        flowChart = new Chart(flowCanvas.getContext('2d'), {
            type: 'bar',
            data: {
                labels: ['L1', 'L2'],
                datasets: [{ data: [0, 0], backgroundColor: ['#3B82F6', '#BBF7D0'], borderRadius: 4, barThickness: 40 }]
            },
            options: { 
                responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } },
                scales: {
                    y: { beginAtZero: true, max: 100, ticks: { callback: function(v){ return v+'%'; }, color: '#9CA3AF' }, grid: { borderDash: [5, 5], color: '#f3f4f6' } },
                    x: { grid: { display: false }, ticks: { color: '#9CA3AF' } }
                }
            }
        });
    }

    return { activityChart, flowChart };
};

// Function to Initialize Reports Charts
window.initReportsCharts = function() {
    const trendCanvas = document.getElementById('trendChart');
    const revCanvas = document.getElementById('revenueChart');

    if (trendCanvas) {
        new Chart(trendCanvas.getContext('2d'), {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                datasets: [
                    { label: 'INR', data: [0, 0, 0, 0, 2000, 500], borderColor: '#3B82F6', backgroundColor: 'rgba(59,130,246,0.1)', borderWidth: 2, fill: true, tension: 0.4 },
                    { label: 'USDT', data: [0, 0, 0, 0, 0, 0], borderColor: '#FBBF24', borderWidth: 2, fill: false, tension: 0.4 }
                ]
            },
            options: {
                responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } },
                scales: {
                    y: { beginAtZero: true, ticks: { callback: function(v){ return '₹'+(v/1000)+'k'; }, color: '#9CA3AF' }, grid: { borderDash: [5, 5] } },
                    x: { ticks: { color: '#9CA3AF' }, grid: { display: false } }
                }
            }
        });
    }

    if (revCanvas) {
        new Chart(revCanvas.getContext('2d'), {
            type: 'doughnut',
            data: {
                labels: ['INR Deposit', 'Tokens'],
                datasets: [{ data: [2600, 2808], backgroundColor: ['#3B82F6', '#22C55E'], borderWidth: 0, cutout: '65%' }]
            },
            options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } } }
        });
    }
};