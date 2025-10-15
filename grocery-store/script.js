// Grocery Store Data
let store = {};

// Update header statistics
function updateStats() {
    const itemCount = Object.keys(store).length;
    let totalValue = 0;
    
    for (const [name, details] of Object.entries(store)) {
        totalValue += details.price * details.quantity;
    }
    
    document.getElementById('total-items').textContent = itemCount;
    document.getElementById('total-value').textContent = totalValue.toFixed(2);
}

// Show/Hide Sections
function showSection(sectionName) {
    // Hide all sections
    const sections = ['menu-section', 'add-section', 'view-section', 'update-section', 'bill-section'];
    sections.forEach(section => {
        const element = document.getElementById(section);
        if (element) {
            element.classList.add('hidden');
        }
    });

    // Show selected section
    if (sectionName === 'menu') {
        document.querySelector('.menu-section').classList.remove('hidden');
    } else if (sectionName === 'add') {
        document.getElementById('add-section').classList.remove('hidden');
    } else if (sectionName === 'view') {
        document.getElementById('view-section').classList.remove('hidden');
        viewItems();
    } else if (sectionName === 'update') {
        document.getElementById('update-section').classList.remove('hidden');
    } else if (sectionName === 'bill') {
        document.getElementById('bill-section').classList.remove('hidden');
        generateBill();
    }

    // Clear messages
    clearMessages();
}

// Clear all messages
function clearMessages() {
    const messages = document.querySelectorAll('.message');
    messages.forEach(msg => {
        msg.className = 'message';
        msg.textContent = '';
    });
}

// Show message
function showMessage(elementId, text, type) {
    const messageElement = document.getElementById(elementId);
    messageElement.textContent = text;
    messageElement.className = `message ${type}`;
}

// Capitalize first letter
function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

// Add Item Function
document.getElementById('add-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = capitalize(document.getElementById('add-name').value.trim());
    const price = parseFloat(document.getElementById('add-price').value);
    const quantity = parseInt(document.getElementById('add-quantity').value);

    if (name && price >= 0 && quantity > 0) {
        store[name] = {
            price: price,
            quantity: quantity
        };
        
        updateStats();
        showMessage('add-message', `✅ ${name} added successfully!`, 'success');
        
        // Clear form
        document.getElementById('add-form').reset();
        
        // Auto-hide message after 3 seconds
        setTimeout(() => {
            clearMessages();
        }, 3000);
    } else {
        showMessage('add-message', '❌ Please fill all fields correctly!', 'error');
    }
});

// View Items Function
function viewItems() {
    const container = document.getElementById('items-table-container');
    
    if (Object.keys(store).length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <div class="icon"><i class="fas fa-shopping-basket"></i></div>
                <h3>No items available</h3>
                <p>Add some items to get started!</p>
            </div>
        `;
        return;
    }

    let tableHTML = `
        <table class="items-table">
            <thead>
                <tr>
                    <th>Item</th>
                    <th>Price (₹)</th>
                    <th>Quantity</th>
                    <th>Total (₹)</th>
                </tr>
            </thead>
            <tbody>
    `;

    for (const [name, details] of Object.entries(store)) {
        const itemTotal = (details.price * details.quantity).toFixed(2);
        tableHTML += `
            <tr>
                <td><strong>${name}</strong></td>
                <td>₹${details.price.toFixed(2)}</td>
                <td>${details.quantity}</td>
                <td>₹${itemTotal}</td>
            </tr>
        `;
    }

    tableHTML += `
            </tbody>
        </table>
    `;

    container.innerHTML = tableHTML;
}

// Update Item Function
document.getElementById('update-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = capitalize(document.getElementById('update-name').value.trim());
    const price = parseFloat(document.getElementById('update-price').value);
    const quantity = parseInt(document.getElementById('update-quantity').value);

    if (store.hasOwnProperty(name)) {
        store[name] = {
            price: price,
            quantity: quantity
        };
        
        updateStats();
        showMessage('update-message', `✅ ${name} updated successfully!`, 'success');
        
        // Clear form
        document.getElementById('update-form').reset();
        
        // Auto-hide message after 3 seconds
        setTimeout(() => {
            clearMessages();
        }, 3000);
    } else {
        showMessage('update-message', `❌ Item "${name}" not found!`, 'error');
    }
});

// Generate Bill Function
function generateBill() {
    const container = document.getElementById('bill-container');
    
    if (Object.keys(store).length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <div class="icon"><i class="fas fa-receipt"></i></div>
                <h3>No items to bill</h3>
                <p>Add some items first!</p>
            </div>
        `;
        return;
    }

    let total = 0;
    let billHTML = `
        <div class="bill-card">
            <div class="bill-header">
                <h3>🧾 GROCERY BILL</h3>
                <p>${new Date().toLocaleDateString('en-IN', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                })}</p>
            </div>
            <div class="bill-items">
    `;

    for (const [name, details] of Object.entries(store)) {
        const itemTotal = details.price * details.quantity;
        total += itemTotal;
        
        billHTML += `
            <div class="bill-item">
                <div>
                    <strong>${name}</strong><br>
                    <small>₹${details.price.toFixed(2)} × ${details.quantity}</small>
                </div>
                <div>
                    <strong>₹${itemTotal.toFixed(2)}</strong>
                </div>
            </div>
        `;
    }

    billHTML += `
            </div>
            <div class="bill-total">
                <i class="fas fa-wallet"></i> Total Bill Amount: ₹${total.toFixed(2)}
            </div>
        </div>
    `;

    container.innerHTML = billHTML;
}

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    // Show menu section by default
    showSection('menu');
    
    // Initialize stats
    updateStats();
    
    // Add some sample data for demonstration (optional - remove if not needed)
    // store = {
    //     'Rice': { price: 50.00, quantity: 2 },
    //     'Milk': { price: 60.00, quantity: 3 },
    //     'Sugar': { price: 45.00, quantity: 1 }
    // };
    // updateStats();
});
