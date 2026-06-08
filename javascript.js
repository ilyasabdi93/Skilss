<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Marvel ai— Login & Register</title>
    <script src="https://accounts.google.com/gsi/client" async defer></script>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html, body { height: 100%; overflow: hidden; }
        body {
            font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
            background: #060610;
            color: #e0e0e0;
        }

        /* ===== 3D BACKGROUND SLIDER ===== */
        #bg3d {
            position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
            z-index: 0; overflow: hidden;
            perspective: 1200px;
        }
        #bg3d .layer {
            position: absolute; top: 0; left: 0; width: 100%; height: 100%;
            background-size: cover; background-position: center;
            opacity: 0;
            transition: opacity 2.5s ease, transform 18s ease;
            transform: scale(1) rotateY(0deg);
            will-change: transform, opacity;
        }
        #bg3d .layer.active {
            opacity: 0.15;
            transform: scale(1.15) rotateY(2deg);
        }
        #bg3d .layer:nth-child(1) { background-image: url('https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=1920&h=1080&fit=crop'); }
        #bg3d .layer:nth-child(2) { background-image: url('https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1920&h=1080&fit=crop'); }
        #bg3d .layer:nth-child(3) { background-image: url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop'); }
        #bg3d .layer:nth-child(4) { background-image: url('https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1920&h=1080&fit=crop'); }
        #bg3d .layer:nth-child(5) { background-image: url('https://images.unsplash.com/photo-1517292987719-0369a794ec0f?w=1920&h=1080&fit=crop'); }
        #bg3d .layer:nth-child(6) { background-image: url('https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1920&h=1080&fit=crop'); }

        /* ===== FLOATING PARTICLES ===== */
        #particles {
            position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
            z-index: 1; pointer-events: none;
            overflow: hidden;
        }
        .particle {
            position: absolute;
            width: 4px; height: 4px;
            background: rgba(240, 192, 64, 0.4);
            border-radius: 50%;
            animation: float linear infinite;
        }
        @keyframes float {
            0% { transform: translateY(100vh) rotate(0deg); opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { transform: translateY(-10vh) rotate(720deg); opacity: 0; }
        }

        /* ===== MAIN CONTAINER ===== */
        .container {
            position: relative; z-index: 2;
            width: 100vw; height: 100vh;
            display: flex; justify-content: center; align-items: center;
            padding: 20px;
        }

        /* ===== GLASS CARD ===== */
        .card {
            background: rgba(16, 16, 30, 0.75);
            backdrop-filter: blur(24px);
            border: 1px solid rgba(255, 255, 255, 0.06);
            border-radius: 32px;
            padding: 50px 44px;
            width: 100%;
            max-width: 440px;
            box-shadow: 0 30px 80px rgba(0, 0, 0, 0.5),
                        0 0 80px rgba(240, 192, 64, 0.02);
            animation: cardIn 0.8s ease;
            position: relative;
            overflow: hidden;
        }
        .card::before {
            content: '';
            position: absolute;
            top: -50%; left: -50%;
            width: 200%; height: 200%;
            background: radial-gradient(
                circle at 50% 50%,
                rgba(240, 192, 64, 0.03),
                transparent 60%
            );
            animation: shimmer 6s ease infinite;
        }
        @keyframes shimmer {
            0%, 100% { transform: translate(0, 0); }
            33% { transform: translate(5%, 5%); }
            66% { transform: translate(-5%, -5%); }
        }
        @keyframes cardIn {
            from { opacity: 0; transform: scale(0.9) translateY(30px); }
            to { opacity: 1; transform: scale(1) translateY(0); }
        }

        /* ===== LOGO / BRAND ===== */
        .brand {
            text-align: center;
            margin-bottom: 32px;
            position: relative; z-index: 1;
        }
        .brand .icon {
            font-size: 3rem;
            margin-bottom: 8px;
            display: block;
        }
        .brand h1 {
            font-size: 2rem;
            font-weight: 800;
            color: #fff;
            letter-spacing: 2px;
        }
        .brand h1 span { color: #f0c040; }
        .brand p {
            color: #888;
            font-size: 0.85rem;
            margin-top: 6px;
            letter-spacing: 1px;
        }

        /* ===== TABS ===== */
        .tabs {
            display: flex;
            gap: 4px;
            background: rgba(255, 255, 255, 0.04);
            border-radius: 14px;
            padding: 4px;
            margin-bottom: 28px;
            position: relative; z-index: 1;
        }
        .tab {
            flex: 1;
            padding: 12px;
            text-align: center;
            border-radius: 12px;
            border: none;
            background: transparent;
            color: #888;
            font-size: 0.85rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s;
            letter-spacing: 0.5px;
            text-transform: uppercase;
        }
        .tab.active {
            background: rgba(240, 192, 64, 0.12);
            color: #f0c040;
            box-shadow: 0 4px 20px rgba(240, 192, 64, 0.08);
        }
        .tab:hover:not(.active) { color: #aaa; }

        /* ===== FORM ===== */
        .form-container {
            position: relative; z-index: 1;
        }
        .form {
            display: none;
            animation: formSlide 0.4s ease;
        }
        .form.active { display: block; }
        @keyframes formSlide {
            from { opacity: 0; transform: translateX(20px); }
            to { opacity: 1; transform: translateX(0); }
        }
        .form-group {
            margin-bottom: 18px;
        }
        .form-group label {
            display: block;
            font-size: 0.75rem;
            color: #888;
            margin-bottom: 6px;
            letter-spacing: 1px;
            text-transform: uppercase;
        }
        .form-group input {
            width: 100%;
            padding: 14px 18px;
            border-radius: 14px;
            border: 1px solid rgba(255, 255, 255, 0.06);
            background: rgba(255, 255, 255, 0.03);
            color: #fff;
            font-size: 0.95rem;
            transition: all 0.3s;
            outline: none;
        }
        .form-group input:focus {
            border-color: rgba(240, 192, 64, 0.3);
            background: rgba(255, 255, 255, 0.05);
            box-shadow: 0 0 30px rgba(240, 192, 64, 0.03);
        }
        .form-group input::placeholder {
            color: #555;
        }
        .form-group .input-icon {
            position: relative;
        }
        .form-group .input-icon input {
            padding-left: 46px;
        }
        .form-group .input-icon .icon {
            position: absolute;
            left: 16px;
            top: 50%;
            transform: translateY(-50%);
            color: #555;
            font-size: 1.1rem;
        }

        /* ===== PASSWORD TOGGLE ===== */
        .password-field {
            position: relative;
        }
        .password-field input { padding-right: 48px; }
        .password-toggle {
            position: absolute;
            right: 16px;
            top: 50%;
            transform: translateY(-50%);
            background: none;
            border: none;
            color: #555;
            cursor: pointer;
            font-size: 1rem;
            transition: color 0.2s;
        }
        .password-toggle:hover { color: #888; }

        /* ===== OPTIONS ===== */
        .form-options {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 22px;
            font-size: 0.8rem;
        }
        .form-options label {
            display: flex;
            align-items: center;
            gap: 8px;
            color: #888;
            cursor: pointer;
        }
        .form-options label input[type="checkbox"] {
            width: 16px; height: 16px;
            accent-color: #f0c040;
        }
        .form-options a {
            color: #666;
            transition: color 0.2s;
        }
        .form-options a:hover { color: #f0c040; }

        /* ===== BUTTONS ===== */
        .btn-submit {
            width: 100%;
            padding: 16px;
            border-radius: 14px;
            border: none;
            background: linear-gradient(135deg, #f0c040, #e0a030);
            color: #060610;
            font-size: 1rem;
            font-weight: 800;
            cursor: pointer;
            transition: all 0.4s;
            letter-spacing: 1px;
            text-transform: uppercase;
            position: relative;
            overflow: hidden;
        }
        .btn-submit::before {
            content: '';
            position: absolute;
            top: 0; left: -120%;
            width: 100%; height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
            transition: left 0.6s;
        }
        .btn-submit:hover::before { left: 120%; }
        .btn-submit:hover {
            transform: translateY(-3px);
            box-shadow: 0 16px 50px rgba(240, 192, 64, 0.25);
        }
        .btn-submit:active { transform: translateY(-1px); }
        .btn-submit.loading {
            pointer-events: none;
            opacity: 0.7;
        }
        .btn-submit.loading::after {
            content: '';
            display: inline-block;
            width: 18px; height: 18px;
            border: 3px solid rgba(6,6,16,0.2);
            border-top: 3px solid #060610;
            border-radius: 50%;
            animation: spin 0.6s linear infinite;
            margin-left: 10px;
            vertical-align: middle;
        }
        @keyframes spin { to { transform: rotate(360deg); } }

        /* ===== DIVIDER ===== */
        .divider {
            display: flex;
            align-items: center;
            gap: 16px;
            margin: 24px 0;
            color: #555;
            font-size: 0.75rem;
            letter-spacing: 1px;
        }
        .divider::before,
        .divider::after {
            content: '';
            flex: 1;
            height: 1px;
            background: rgba(255, 255, 255, 0.04);
        }

        /* ===== SOCIAL BUTTONS ===== */
        .social-btn {
            width: 100%;
            padding: 14px;
            border-radius: 14px;
            border: 1px solid rgba(255, 255, 255, 0.06);
            background: rgba(255, 255, 255, 0.02);
            color: #ccc;
            font-size: 0.9rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
        }
        .social-btn:hover {
            background: rgba(255, 255, 255, 0.04);
            border-color: rgba(255, 255, 255, 0.1);
            transform: translateY(-2px);
        }
        .social-btn .social-icon {
            font-size: 1.2rem;
        }
        .g_id_signin {
            display: flex;
            justify-content: center;
            width: 100%;
        }
        #g_id_onload { display: none; }

        /* ===== SUCCESS / ERROR MESSAGES ===== */
        .message {
            padding: 12px 16px;
            border-radius: 12px;
            font-size: 0.8rem;
            margin-bottom: 18px;
            display: none;
            animation: msgIn 0.3s ease;
        }
        @keyframes msgIn {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .message.error {
            display: block;
            background: rgba(231, 76, 60, 0.08);
            border: 1px solid rgba(231, 76, 60, 0.15);
            color: #e74c3c;
        }
        .message.success {
            display: block;
            background: rgba(74, 222, 128, 0.08);
            border: 1px solid rgba(74, 222, 128, 0.15);
            color: #4ade80;
        }

        /* ===== TERMS ===== */
        .terms {
            text-align: center;
            margin-top: 20px;
            font-size: 0.7rem;
            color: #555;
            position: relative; z-index: 1;
        }
        .terms a { color: #f0c040; opacity: 0.7; transition: opacity 0.2s; }
        .terms a:hover { opacity: 1; }

        /* ===== RESPONSIVE ===== */
        @media (max-width: 480px) {
            .card { padding: 36px 24px; border-radius: 24px; }
            .brand h1 { font-size: 1.5rem; }
            .brand .icon { font-size: 2.2rem; }
            .tabs { font-size: 0.75rem; }
            .form-group input { padding: 12px 14px; font-size: 0.85rem; }
            .btn-submit { padding: 14px; font-size: 0.85rem; }
        }
    </style>
</head>
<body>

    <!-- ===== 3D BACKGROUND SLIDER ===== -->
    <div id="bg3d">
        <div class="layer active"></div>
        <div class="layer"></div>
        <div class="layer"></div>
        <div class="layer"></div>
        <div class="layer"></div>
        <div class="layer"></div>
    </div>

    <!-- ===== FLOATING PARTICLES ===== -->
    <div id="particles"></div>

    <!-- ===== MAIN CONTAINER ===== -->
    <div class="container">
        <div class="card">

            <!-- Brand -->
            <div class="brand">
                <span class="icon">✦</span>
                <h1>Baro <span>Xirfadada</span></h1>
                <p>Learn · Build · Grow</p>
            </div>

            <!-- Tabs -->
            <div class="tabs">
                <button class="tab active" onclick="switchTab('login')">Login</button>
                <button class="tab" onclick="switchTab('register')">Register</button>
            </div>

            <!-- Messages -->
            <div id="message"></div>

            <!-- Login Form -->
            <div class="form-container">
                <div class="form active" id="loginForm">
                    <div class="form-group">
                        <label>Email Address</label>
                        <div class="input-icon">
                            <span class="icon">📧</span>
                            <input type="email" id="loginEmail" placeholder="your@email.com" />
                        </div>
                    </div>
                    <div class="form-group">
                        <label>Password</label>
                        <div class="password-field">
                            <div class="input-icon">
                                <span class="icon">🔒</span>
                                <input type="password" id="loginPassword" placeholder="••••••••" />
                            </div>
                            <button class="password-toggle" onclick="togglePassword('loginPassword', this)">👁</button>
                        </div>
                    </div>
                    <div class="form-options">
                        <label><input type="checkbox" checked /> Remember me</label>
                        <a href="#">Forgot password?</a>
                    </div>
                    <button class="btn-submit" onclick="handleLogin()">Sign In</button>

                    <div class="divider">or continue with</div>

                    <div id="g_id_onload"
                         data-client_id="950088039383-i7buq07iqd6b3k8vqofefbhk4kl71bjm.apps.googleusercontent.com"
                         data-context="signin"
                         data-ux_mode="popup"
                         data-callback="handleGoogleLogin"
                         data-auto_prompt="false">
                    </div>
                    <div class="g_id_signin"
                         data-type="standard"
                         data-shape="rectangular"
                         data-theme="outline"
                         data-text="signin_with"
                         data-size="large"
                         data-logo_alignment="left">
                    </div>
                </div>

                <!-- Register Form -->
                <div class="form" id="registerForm">
                    <div class="form-group">
                        <label>Full Name</label>
                        <div class="input-icon">
                            <span class="icon">👤</span>
                            <input type="text" id="regName" placeholder="Ilyas Abdi Ali" />
                        </div>
                    </div>
                    <div class="form-group">
                        <label>Email Address</label>
                        <div class="input-icon">
                            <span class="icon">📧</span>
                            <input type="email" id="regEmail" placeholder="your@email.com" />
                        </div>
                    </div>
                    <div class="form-group">
                        <label>Password</label>
                        <div class="password-field">
                            <div class="input-icon">
                                <span class="icon">🔒</span>
                                <input type="password" id="regPassword" placeholder="Create a password" />
                            </div>
                            <button class="password-toggle" onclick="togglePassword('regPassword', this)">👁</button>
                        </div>
                    </div>
                    <div class="form-group">
                        <label>Confirm Password</label>
                        <div class="password-field">
                            <div class="input-icon">
                                <span class="icon">🔒</span>
                                <input type="password" id="regConfirm" placeholder="Confirm password" />
                            </div>
                            <button class="password-toggle" onclick="togglePassword('regConfirm', this)">👁</button>
                        </div>
                    </div>
                    <div class="form-options">
                        <label><input type="checkbox" id="regTerms" /> I agree to the <a href="#" style="color:#f0c040;">Terms & Conditions</a></label>
                    </div>
                    <button class="btn-submit" onclick="handleRegister()">Create Account</button>

                    <div class="divider">or sign up with</div>
                    <div class="g_id_signin"
                         data-type="standard"
                         data-shape="rectangular"
                         data-theme="outline"
                         data-text="signup_with"
                         data-size="large"
                         data-logo_alignment="left">
                    </div>
                </div>
            </div>

            <div class="terms">
                By continuing, you agree to our <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>
            </div>

        </div>
    </div>

    <script>
        // ================================================================
        // 3D BACKGROUND SLIDER
        // ================================================================
        let bgIdx = 0;
        const bgLayers = document.querySelectorAll('#bg3d .layer');
        function nextBg() {
            bgLayers.forEach(l => l.classList.remove('active'));
            bgIdx = (bgIdx + 1) % bgLayers.length;
            bgLayers[bgIdx].classList.add('active');
        }
        setInterval(nextBg, 4500);

        // ================================================================
        // FLOATING PARTICLES
        // ================================================================
        const particlesContainer = document.getElementById('particles');
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.width = (Math.random() * 4 + 2) + 'px';
            particle.style.height = particle.style.width;
            particle.style.animationDuration = (Math.random() * 20 + 15) + 's';
            particle.style.animationDelay = (Math.random() * 20) + 's';
            particle.style.opacity = Math.random() * 0.5 + 0.1;
            particlesContainer.appendChild(particle);
        }

        // ================================================================
        // TAB SWITCHING
        // ================================================================
        function switchTab(tab) {
            document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.form').forEach(f => f.classList.remove('active'));
            document.getElementById('message').className = 'message';
            document.getElementById('message').textContent = '';

            if (tab === 'login') {
                document.querySelectorAll('.tab')[0].classList.add('active');
                document.getElementById('loginForm').classList.add('active');
            } else {
                document.querySelectorAll('.tab')[1].classList.add('active');
                document.getElementById('registerForm').classList.add('active');
            }
        }

        // ================================================================
        // PASSWORD TOGGLE
        // ================================================================
        function togglePassword(inputId, btn) {
            const input = document.getElementById(inputId);
            if (input.type === 'password') {
                input.type = 'text';
                btn.textContent = '🙈';
            } else {
                input.type = 'password';
                btn.textContent = '👁';
            }
        }

        // ================================================================
        // SHOW MESSAGE
        // ================================================================
        function showMessage(text, type) {
            const el = document.getElementById('message');
            el.className = 'message ' + type;
            el.textContent = text;
            setTimeout(() => {
                el.className = 'message';
            }, 4000);
        }

        // ================================================================
        // LOGIN HANDLER
        // ================================================================
        function handleLogin() {
            const email = document.getElementById('loginEmail').value.trim();
            const pass = document.getElementById('loginPassword').value.trim();
            const btn = document.querySelector('#loginForm .btn-submit');

            if (!email || !pass) {
                showMessage('⚠️ Please fill in all fields', 'error');
                return;
            }
            if (!email.includes('@') || !email.includes('.')) {
                showMessage('⚠️ Please enter a valid email address', 'error');
                return;
            }
            if (pass.length < 4) {
                showMessage('⚠️ Password must be at least 4 characters', 'error');
                return;
            }

            btn.classList.add('loading');
            btn.textContent = 'Signing In';

            // Simulate login
            setTimeout(() => {
                btn.classList.remove('loading');
                btn.textContent = 'Sign In';
                showMessage('✅ Welcome back! Redirecting...', 'success');
                
                // Store session
                localStorage.setItem('baro_user', JSON.stringify({
                    email: email,
                    name: email.split('@')[0],
                    loggedIn: true
                }));
                
                // Redirect to main site after delay
                setTimeout(() => {
                    window.location.href = window.location.origin + window.location.pathname.replace(/\/[^\/]*$/, '') + '/index.html';
                }, 1200);
            }, 1500);
        }

        // ================================================================
        // REGISTER HANDLER
        // ================================================================
        function handleRegister() {
            const name = document.getElementById('regName').value.trim();
            const email = document.getElementById('regEmail').value.trim();
            const pass = document.getElementById('regPassword').value.trim();
            const confirm = document.getElementById('regConfirm').value.trim();
            const terms = document.getElementById('regTerms').checked;
            const btn = document.querySelector('#registerForm .btn-submit');

            // Validation
            if (!name || !email || !pass || !confirm) {
                showMessage('⚠️ Please fill in all fields', 'error');
                return;
            }
            if (!email.includes('@') || !email.includes('.')) {
                showMessage('⚠️ Please enter a valid email address', 'error');
                return;
            }
            if (pass.length < 6) {
                showMessage('⚠️ Password must be at least 6 characters', 'error');
                return;
            }
            if (pass !== confirm) {
                showMessage('⚠️ Passwords do not match', 'error');
                return;
            }
            if (!terms) {
                showMessage('⚠️ Please agree to the Terms & Conditions', 'error');
                return;
            }

            btn.classList.add('loading');
            btn.textContent = 'Creating Account';

            // Simulate registration
            setTimeout(() => {
                btn.classList.remove('loading');
                btn.textContent = 'Create Account';
                showMessage('✅ Account created! Welcome to Baro Xirfadada!', 'success');
                
                // Store session
                localStorage.setItem('baro_user', JSON.stringify({
                    email: email,
                    name: name,
                    loggedIn: true
                }));
                
                // Redirect to main site
                setTimeout(() => {
                    window.location.href = window.location.origin + window.location.pathname.replace(/\/[^\/]*$/, '') + '/index.html';
                }, 1500);
            }, 1800);
        }

        // ================================================================
        // GOOGLE LOGIN
        // ================================================================
        function handleGoogleLogin(response) {
            const payload = JSON.parse(atob(response.credential.split('.')[1]));
            
            showMessage('✅ Signed in with Google! Welcome, ' + payload.name, 'success');
            
            localStorage.setItem('baro_user', JSON.stringify({
                email: payload.email,
                name: payload.name,
                picture: payload.picture,
                loggedIn: true
            }));
            
            setTimeout(() => {
                window.location.href = window.location.origin + window.location.pathname.replace(/\/[^\/]*$/, '') + '/index.html';
            }, 1200);
        }

        // ================================================================
        // ENTER KEY SUPPORT
        // ================================================================
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const loginActive = document.getElementById('loginForm').classList.contains('active');
                if (loginActive) handleLogin();
                else handleRegister();
            }
        });

        // ================================================================
        // CHECK IF ALREADY LOGGED IN
        // ================================================================
        const stored = localStorage.getItem('baro_user');
        if (stored) {
            const user = JSON.parse(stored);
            if (user.loggedIn) {
                // Already logged in, could redirect
                // For demo, we just show the login page anyway
                // In production, redirect to main site
            }
        }
    </script>
</body>
</html>