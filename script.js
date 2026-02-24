// DOM Elements
const signinForm = document.getElementById('signin-form');
const signupForm = document.getElementById('signup-form');
const messageContainer = document.createElement('div');

// Add message container to the page
document.querySelector('.auth-container').insertBefore(messageContainer, document.querySelector('.tabs').nextSibling);

// Tab Switching Function
window.switchTab = function(tabName) {
    // Update tab buttons
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    if (tabName === 'signin') {
        document.querySelector('.tab-btn[onclick="switchTab(\'signin\')"]').classList.add('active');
        signinForm.classList.add('active');
        signupForm.classList.remove('active');
    } else {
        document.querySelector('.tab-btn[onclick="switchTab(\'signup\')"]').classList.add('active');
        signupForm.classList.add('active');
        signinForm.classList.remove('active');
    }
    
    // Clear any existing messages
    showMessage('', '');
}

// Form Validation Helpers
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePassword(password) {
    return password.length >= 6;
}

function showMessage(message, type) {
    if (!message) {
        messageContainer.style.display = 'none';
        messageContainer.innerHTML = '';
        return;
    }
    
    messageContainer.className = `message ${type}`;
    messageContainer.textContent = message;
    messageContainer.style.display = 'block';
    
    // Auto-hide success messages after 3 seconds
    if (type === 'success') {
        setTimeout(() => {
            showMessage('', '');
        }, 3000);
    }
}

// Loading State Management
function setLoadingState(form, isLoading) {
    const submitBtn = form.querySelector('.auth-btn');
    const originalText = submitBtn.innerHTML;
    
    if (isLoading) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span class="loading"></span> Processing...';
    } else {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
    }
}

// Sign In Handler
signinForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = document.getElementById('signin-email').value.trim();
    const password = document.getElementById('signin-password').value;
    
    // Validation
    if (!email || !password) {
        showMessage('Please fill in all fields', 'error');
        return;
    }
    
    if (!validateEmail(email)) {
        showMessage('Please enter a valid email address', 'error');
        return;
    }
    
    setLoadingState(signinForm, true);
    
    try {
        const response = await fetch('/api/auth/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password })
        });
        
        const data = await response.json();
        
        if (data.success) {
            showMessage('Sign in successful! Redirecting...', 'success');
            
            // Store token and user info
            localStorage.setItem('authToken', data.data.token);
            localStorage.setItem('user', JSON.stringify(data.data.user));
            
            // Redirect to dashboard (you can create this page later)
            setTimeout(() => {
                window.location.href = '/dashboard.html';
            }, 1500);
        } else {
            showMessage(data.message || 'Sign in failed', 'error');
        }
    } catch (error) {
        console.error('Sign in error:', error);
        showMessage('Network error. Please try again.', 'error');
    } finally {
        setLoadingState(signinForm, false);
    }
});

// Sign Up Handler
signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const name = document.getElementById('signup-name').value.trim();
    const email = document.getElementById('signup-email').value.trim();
    const password = document.getElementById('signup-password').value;
    const confirmPassword = document.getElementById('signup-confirm').value;
    
    // Validation
    if (!name || !email || !password || !confirmPassword) {
        showMessage('Please fill in all fields', 'error');
        return;
    }
    
    if (!validateEmail(email)) {
        showMessage('Please enter a valid email address', 'error');
        return;
    }
    
    if (!validatePassword(password)) {
        showMessage('Password must be at least 6 characters long', 'error');
        return;
    }
    
    if (password !== confirmPassword) {
        showMessage('Passwords do not match', 'error');
        return;
    }
    
    setLoadingState(signupForm, true);
    
    try {
        const response = await fetch('/api/auth/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, password })
        });
        
        const data = await response.json();
        
        if (data.success) {
            showMessage('Account created successfully! Redirecting to sign in...', 'success');
            
            // Clear the form
            signupForm.reset();
            
            // Switch to sign in tab after 2 seconds
            setTimeout(() => {
                switchTab('signin');
                showMessage('', '');
            }, 2000);
        } else {
            showMessage(data.message || 'Registration failed', 'error');
        }
    } catch (error) {
        console.error('Sign up error:', error);
        showMessage('Network error. Please try again.', 'error');
    } finally {
        setLoadingState(signupForm, false);
    }
});

// Password Strength Indicator (Optional Enhancement)
const passwordInput = document.getElementById('signup-password');
const confirmPasswordInput = document.getElementById('signup-confirm');

passwordInput.addEventListener('input', () => {
    const password = passwordInput.value;
    const strengthBar = document.getElementById('password-strength');
    
    if (password.length > 0 && !strengthBar) {
        createPasswordStrengthIndicator();
    }
    
    updatePasswordStrength(password);
});

function createPasswordStrengthIndicator() {
    const container = document.createElement('div');
    container.id = 'password-strength';
    container.innerHTML = `
        <div style="margin-top: 5px; font-size: 0.8rem; color: #718096;">
            Password strength: <span id="strength-text">Weak</span>
        </div>
        <div style="height: 4px; background: #e2e8f0; border-radius: 2px; margin-top: 5px;">
            <div id="strength-bar" style="height: 100%; width: 0%; background: #667eea; transition: width 0.3s, background-color 0.3s;"></div>
        </div>
    `;
    
    passwordInput.parentNode.appendChild(container);
}

function updatePasswordStrength(password) {
    const strengthText = document.getElementById('strength-text');
    const strengthBar = document.getElementById('strength-bar');
    
    if (!strengthText || !strengthBar) return;
    
    let strength = 0;
    let color = '#667eea';
    let text = 'Weak';
    
    if (password.length >= 8) strength += 25;
    if (/[a-z]/.test(password)) strength += 25;
    if (/[A-Z]/.test(password)) strength += 25;
    if (/[0-9]/.test(password)) strength += 25;
    
    if (strength >= 75) {
        color = '#48bb78';
        text = 'Strong';
    } else if (strength >= 50) {
        color = '#ed8936';
        text = 'Medium';
    }
    
    strengthBar.style.width = strength + '%';
    strengthBar.style.backgroundColor = color;
    strengthText.textContent = text;
    strengthText.style.color = color;
}

// Confirm Password Match Indicator
confirmPasswordInput.addEventListener('input', () => {
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;
    const matchIndicator = document.getElementById('password-match');
    
    if (!matchIndicator) {
        const container = document.createElement('div');
        container.id = 'password-match';
        container.style.fontSize = '0.8rem';
        container.style.marginTop = '5px';
        confirmPasswordInput.parentNode.appendChild(container);
    }
    
    const indicator = document.getElementById('password-match');
    
    if (confirmPassword.length > 0) {
        if (password === confirmPassword) {
            indicator.textContent = '✓ Passwords match';
            indicator.style.color = '#48bb78';
        } else {
            indicator.textContent = '✗ Passwords do not match';
            indicator.style.color = '#e53e3e';
        }
    } else {
        indicator.textContent = '';
    }
});

// Remember Me functionality
const rememberCheckbox = document.querySelector('input[name="remember"]');
if (rememberCheckbox) {
    // Check if user wants to be remembered
    const savedEmail = localStorage.getItem('rememberedEmail');
    if (savedEmail) {
        document.getElementById('signin-email').value = savedEmail;
        rememberCheckbox.checked = true;
    }
    
    rememberCheckbox.addEventListener('change', () => {
        if (rememberCheckbox.checked) {
            const email = document.getElementById('signin-email').value;
            localStorage.setItem('rememberedEmail', email);
        } else {
            localStorage.removeItem('rememberedEmail');
        }
    });
}

// Auto-fill prevention for security
document.querySelectorAll('input[type="password"]').forEach(input => {
    input.setAttribute('autocomplete', 'new-password');
});

// Check if user is already logged in
function checkAuth() {
    const token = localStorage.getItem('authToken');
    if (token) {
        // Verify token is still valid (basic check)
        try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            const now = Date.now() / 1000;
            
            if (payload.exp > now) {
                // Token is valid, redirect to dashboard
                window.location.href = '/dashboard.html';
            }
        } catch (e) {
            // Invalid token, remove it
            localStorage.removeItem('authToken');
            localStorage.removeItem('user');
        }
    }
}

// Initialize
checkAuth();

// Add some visual feedback for form interactions
document.querySelectorAll('.form-group input').forEach(input => {
    input.addEventListener('focus', () => {
        input.parentElement.style.transform = 'translateY(-2px)';
        input.parentElement.style.transition = 'transform 0.2s ease';
    });
    
    input.addEventListener('blur', () => {
        input.parentElement.style.transform = 'translateY(0)';
    });
});

console.log('Authentication system loaded successfully!');