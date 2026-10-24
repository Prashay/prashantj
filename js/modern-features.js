/**
 * MODERN 2026 COMPETITIVE EDGE FEATURES
 * 1. Command Palette (Ctrl+K / Cmd+K Spotlight Navigator)
 * 2. "Ask Prashant AI Architecture Twin" (Interactive Agentic Assistant)
 * 3. Interactive System Design Blueprints Modal
 * 4. Recruiter 30-Second Fast-Track Dossier
 * 5. Interactive P99 Latency & Concurrency Simulator
 */

(function () {
    'use strict';

    // =========================================================================
    // 1. RECRUITER 30-SECOND FAST-TRACK DOSSIER
    // =========================================================================
    window.openRecruiterModal = function () {
        const modal = document.getElementById('recruiterDossierModal');
        if (modal) {
            modal.classList.add('active');
            modal.setAttribute('aria-hidden', 'false');
            document.body.classList.add('modal-open-blur');
        }
    };

    window.closeRecruiterModal = function () {
        const modal = document.getElementById('recruiterDossierModal');
        if (modal) {
            modal.classList.remove('active');
            modal.setAttribute('aria-hidden', 'true');
            document.body.classList.remove('modal-open-blur');
        }
    };

    window.copyRecruiterPitch = function () {
        const pitchText = `Prashant Kumar Jha - Senior Backend Engineer & Technical Lead
8+ Years Experience | Distributed Systems, Cloud Architecture & GenAI
Key Scale Impact: Scaled Lowe's Tachyon platform across 1,621 stores with 170ms P99 latency & 2.3M daily transactions.
Core Stack: Java 17/21, Spring Boot, Microservices, Kafka, Redis, Docker, Kubernetes, AWS, MCP / Agentic AI.
Contact: jprashant2026@gmail.com | Portfolio: https://prashay.github.io/prashantj/ | LinkedIn: https://www.linkedin.com/in/prashant-kumar-jha-5b504b185`;

        navigator.clipboard.writeText(pitchText).then(() => {
            const btn = document.getElementById('btnCopyPitch');
            if (btn) {
                const originalHtml = btn.innerHTML;
                btn.innerHTML = '<i class="fa fa-check"></i> Copied Pitch to Clipboard!';
                btn.classList.add('copied');
                setTimeout(() => {
                    btn.innerHTML = originalHtml;
                    btn.classList.remove('copied');
                }, 2500);
            }
        }).catch(err => {
            console.error('Failed to copy pitch: ', err);
        });
    };

    // =========================================================================
    // 2. SYSTEM ARCHITECTURE BLUEPRINT MODAL
    // =========================================================================
    const blueprintData = {
        lowes: {
            title: "Lowe's Tachyon Distributed Store Architecture (1,621 Stores)",
            badge: "HIGH-CONCURRENCY DISTRIBUTED EDGE & CLUSTER",
            metrics: "1,621 Stores • 2.3M Transactions/Day • 170ms P99 Latency • 99.99% Uptime",
            description: "High-throughput, event-driven distributed checkout & inventory synchronization architecture connecting 1,621 edge retail store servers to cloud microservices with sub-second real-time consistency.",
            nodes: [
                { id: "edge", label: "Edge Store Terminals", sub: "1,621 Stores Point-of-Sale", desc: "Local edge POS clusters running store instances with offline buffer queues." },
                { id: "ingress", label: "Envoy API Gateway", sub: "mTLS, Rate-Limiting & Auth", desc: "High-performance edge ingress routing over 2.3M requests daily with circuit breakers." },
                { id: "kafka", label: "Kafka Event Mesh", sub: "Partitioned Transaction Topics", desc: "Distributed log ensuring zero transaction drop with dead-letter queue recovery." },
                { id: "services", label: "Spring Boot Microservices", sub: "Reactive Non-Blocking Engine", desc: "Horizontally scalable containers processing business workflows with reactive I/O." },
                { id: "cache", label: "Redis & Hazelcast Cache", sub: "Distributed Write-Through", desc: "Sub-5ms in-memory cache layer maintaining stock availability and store catalog." },
                { id: "persistence", label: "Polyglot Data Cluster", sub: "PostgreSQL & Cassandra", desc: "Partitioned relational audit records and high-scale columnar time-series storage." },
                { id: "telemetry", label: "Observability Grid", sub: "Prometheus, Grafana, Splunk", desc: "Real-time distributed tracing with OpenTelemetry, alerting on SLA anomalies." }
            ]
        },
        ibm: {
            title: "IBM Enterprise CI/CD Control Plane Architecture",
            badge: "AUTOMATED CANARY & ZERO-VULNERABILITY PIPELINE",
            metrics: "Multi-Region Kubernetes • 0 Security Regressions • Snyk Automated Gate",
            description: "Enterprise deployment control plane integrating automated vulnerability scanning (Snyk), immutable container builds, and Canary release verification for mission-critical core services.",
            nodes: [
                { id: "git", label: "Git Control Trigger", sub: "Trunk-Based Commit Grid", desc: "Multi-developer feature branches with enforced commit signing and architectural review." },
                { id: "snyk", label: "Snyk Security Gate", sub: "Static Analysis & CVE Auditing", desc: "Automated vulnerability gating halting builds on high/critical CVSS scores." },
                { id: "build", label: "Container Orchestration", sub: "Docker Multi-Stage Builds", desc: "Reproducible container artifacts published to private secure registry." },
                { id: "canary", label: "Canary Controller", sub: "Traffic Splitting (5% -> 100%)", desc: "Dynamic traffic routing observing error rates before full production rollout." },
                { id: "k8s", label: "Multi-Region Kubernetes", sub: "EKS / Red Hat OpenShift", desc: "Zero-downtime rolling pods with resource limits and PodDisruptionBudgets." },
                { id: "metrics", label: "Dynatrace Telemetry", sub: "APM & Anomaly Detection", desc: "Automated rollback triggers if P99 latency or 5xx error thresholds exceed 0.05%." }
            ]
        }
    };

    window.openBlueprintModal = function (blueprintKey) {
        blueprintKey = blueprintKey || 'lowes';
        const data = blueprintData[blueprintKey] || blueprintData.lowes;
        const modal = document.getElementById('blueprintModal');
        if (!modal) return;

        document.getElementById('blueprintTitle').innerText = data.title;
        document.getElementById('blueprintBadge').innerText = data.badge;
        document.getElementById('blueprintMetrics').innerText = data.metrics;
        document.getElementById('blueprintDescription').innerText = data.description;

        // Render nodes
        const container = document.getElementById('blueprintNodesContainer');
        if (container) {
            container.innerHTML = data.nodes.map((node, idx) => `
                <div class="bp-node-card" tabindex="0">
                    <div class="bp-node-step">${idx + 1}</div>
                    <div class="bp-node-content">
                        <h5>${node.label}</h5>
                        <span class="bp-node-sub">${node.sub}</span>
                        <p class="bp-node-desc">${node.desc}</p>
                    </div>
                </div>
            `).join('');
        }

        modal.classList.add('active');
        modal.setAttribute('aria-hidden', 'false');
        document.body.classList.add('modal-open-blur');
    };

    window.closeBlueprintModal = function () {
        const modal = document.getElementById('blueprintModal');
        if (modal) {
            modal.classList.remove('active');
            modal.setAttribute('aria-hidden', 'true');
            document.body.classList.remove('modal-open-blur');
        }
    };

    // =========================================================================
    // 3. COMMAND PALETTE (CMD+K / CTRL+K SPOTLIGHT NAVIGATOR)
    // =========================================================================
    window.openCommandPalette = function () {
        const palette = document.getElementById('commandPaletteModal');
        if (palette) {
            palette.classList.add('active');
            palette.setAttribute('aria-hidden', 'false');
            document.body.classList.add('modal-open-blur');
            const input = document.getElementById('cmdPaletteInput');
            if (input) {
                input.value = '';
                input.focus();
                filterCommandItems('');
            }
        }
    };

    window.closeCommandPalette = function () {
        const palette = document.getElementById('commandPaletteModal');
        if (palette) {
            palette.classList.remove('active');
            palette.setAttribute('aria-hidden', 'true');
            document.body.classList.remove('modal-open-blur');
        }
    };

    function filterCommandItems(query) {
        query = query.toLowerCase().trim();
        const items = document.querySelectorAll('.cmd-item');
        let visibleCount = 0;

        items.forEach(item => {
            const text = item.getAttribute('data-cmd-search') || item.innerText.toLowerCase();
            if (!query || text.indexOf(query) > -1) {
                item.style.display = 'flex';
                visibleCount++;
            } else {
                item.style.display = 'none';
            }
            item.classList.remove('selected');
        });

        // Select first visible
        const firstVisible = document.querySelector('.cmd-item[style*="display: flex"]');
        if (firstVisible) {
            firstVisible.classList.add('selected');
        }

        // Hide empty category headers
        document.querySelectorAll('.cmd-group').forEach(group => {
            const hasVisible = group.querySelectorAll('.cmd-item[style*="display: flex"]').length > 0;
            group.style.display = hasVisible ? 'block' : 'none';
        });
    }

    // =========================================================================
    // 4. "ASK PRASHANT'S AI ARCHITECTURE TWIN" (AGENTIC ASSISTANT)
    // =========================================================================
    window.toggleAITwin = function (forceOpen) {
        const widget = document.getElementById('aiTwinWidget');
        if (!widget) return;
        const isOpen = widget.classList.contains('active');
        if (forceOpen === true || !isOpen) {
            widget.classList.add('active');
            const input = document.getElementById('aiTwinInput');
            if (input) setTimeout(() => input.focus(), 200);
        } else {
            widget.classList.remove('active');
        }
    };

    const aiKnowledgeBase = [
        {
            keywords: ["scale", "1621", "1,621", "store", "stores", "lowe", "lowes", "latency", "170ms", "p99", "tachyon"],
            response: `At Lowe's India, Prashant architected and led the **Tachyon store platform** deployed across **1,621 stores**, processing **2.3M+ daily transactions** with an SLA-beating **170ms P99 latency**.<br><br>Key architectural implementations included:<br>• <strong>Event-Driven Ingress:</strong> Distributed Kafka partitions regulating edge-to-cloud backpressure.<br>• <strong>Sub-5ms Distributed Caching:</strong> Multi-layer Redis and Hazelcast with write-through invalidation.<br>• <strong>Reactive Spring Boot:</strong> Non-blocking thread pooling preventing I/O exhaustion under retail peak peaks.<br>• <strong>Resilience:</strong> Circuit breakers & dead-letter queues enabling 99.99% system availability.`
        },
        {
            keywords: ["ibm", "cicd", "ci/cd", "pipeline", "control plane", "canary", "snyk", "security"],
            response: `At IBM India, Prashant served as Lead Backend Engineer designing an **enterprise CI/CD Control Plane** that orchestrated continuous deployments with zero security regressions.<br><br>Key achievements:<br>• Engineered an automated **Snyk vulnerability gate** blocking builds with High/Critical CVEs.<br>• Architected **Canary progressive rollouts** (5% -> 25% -> 100%) on Kubernetes clusters.<br>• Reduced deployment failure rates by **40%** and achieved strict enterprise compliance.`
        },
        {
            keywords: ["genai", "ai", "agent", "agents", "agentic", "mcp", "llm", "claude", "watsonx", "copilot"],
            response: `Prashant operates at the frontier of **2026 Agentic AI & Backend Systems**:<br><br>• <strong>Accreditations:</strong> Microsoft & LinkedIn Certified in GenAI, Anthropic Claude Code, IBM watsonx Essentials.<br>• <strong>MCP (Model Context Protocol):</strong> Integrates autonomous AI tools & agent workflows directly into enterprise engineering pipelines.<br>• <strong>Production Impact:</strong> Spearheaded AI-assisted code review pipelines at Lowe's reducing defect leakage by **30%**.`
        },
        {
            keywords: ["skills", "stack", "tech", "technologies", "java", "spring", "kafka", "microservices"],
            response: `<strong>Core Technical Stack:</strong><br>• <strong>Languages:</strong> Java (8 / 11 / 17 / 21), TypeScript, SQL, Bash.<br>• <strong>Frameworks:</strong> Spring Boot, Spring Cloud, Hibernate, Node.js.<br>• <strong>Distributed Systems:</strong> Apache Kafka, Redis, Hazelcast, REST, gRPC.<br>• <strong>Cloud & DevOps:</strong> AWS (EC2, ECS, Lambda), Docker, Kubernetes, Jenkins, Snyk, GitHub Actions.<br>• <strong>Databases:</strong> PostgreSQL, MySQL, Cassandra, Oracle.<br>• <strong>Certifications:</strong> 20 industry accreditations (Credly, AWS, MSFT, Anthropic, Scaled Agile).`
        },
        {
            keywords: ["leadership", "lead", "mentor", "management", "team", "hire", "why"],
            response: `Prashant brings **8+ years of enterprise engineering leadership**:<br><br>• <strong>Team Mentorship:</strong> Mentored and leveled up 12+ senior & backend engineers across multi-region pods.<br>• <strong>Agile Delivery:</strong> Certified SAFe® 5 Practitioner driving quarterly PI planning and technical governance.<br>• <strong>Business Value:</strong> Translates high-level enterprise roadmaps into fault-tolerant distributed backends with verifiable ROI and zero downtime.`
        },
        {
            keywords: ["contact", "email", "phone", "hire", "interview", "call", "reach"],
            response: `You can reach Prashant Kumar Jha directly via:<br>• <strong>Email:</strong> <a href="mailto:jprashant2026@gmail.com" style="color:#38bdf8;text-decoration:underline;">jprashant2026@gmail.com</a><br>• <strong>LinkedIn:</strong> <a href="https://www.linkedin.com/in/prashant-kumar-jha-5b504b185" target="_blank" style="color:#38bdf8;text-decoration:underline;">Prashant Kumar Jha Profile</a><br>• <strong>GitHub:</strong> <a href="https://github.com/Prashay" target="_blank" style="color:#38bdf8;text-decoration:underline;">github.com/Prashay</a><br>• <strong>Resume:</strong> <a href="img/Prashant_Kumar_Jha_Resume.pdf" download style="color:#38bdf8;text-decoration:underline;">Download PDF Resume</a>`
        }
    ];

    window.askAITwinPrompt = function (text) {
        const input = document.getElementById('aiTwinInput');
        if (input) {
            input.value = text;
            window.sendAITwinMessage();
        }
    };

    window.sendAITwinMessage = function () {
        const input = document.getElementById('aiTwinInput');
        const container = document.getElementById('aiTwinMessages');
        if (!input || !container) return;

        const userText = input.value.trim();
        if (!userText) return;

        // Append user message
        const userMsgDiv = document.createElement('div');
        userMsgDiv.className = 'ai-msg ai-msg-user';
        userMsgDiv.innerHTML = `<div class="ai-msg-bubble">${escapeHtml(userText)}</div>`;
        container.appendChild(userMsgDiv);
        input.value = '';
        container.scrollTop = container.scrollHeight;

        // Show typing indicator
        const typingDiv = document.createElement('div');
        typingDiv.className = 'ai-msg ai-msg-assistant ai-typing';
        typingDiv.innerHTML = `<div class="ai-msg-bubble"><span class="typing-dot"></span><span class="typing-dot"></span><span class="typing-dot"></span></div>`;
        container.appendChild(typingDiv);
        container.scrollTop = container.scrollHeight;

        // Match response
        setTimeout(() => {
            container.removeChild(typingDiv);
            const lower = userText.toLowerCase();
            let matchedAnswer = null;

            for (let item of aiKnowledgeBase) {
                for (let kw of item.keywords) {
                    if (lower.indexOf(kw) > -1) {
                        matchedAnswer = item.response;
                        break;
                    }
                }
                if (matchedAnswer) break;
            }

            if (!matchedAnswer) {
                matchedAnswer = `I specialize in Prashant's architecture at Lowe's (1,621 stores, 170ms P99), IBM CI/CD control planes, and 2026 Agentic AI / MCP workflows. Feel free to ask about his **distributed systems metrics**, **Spring Boot & Kafka stack**, **certifications**, or **leadership experience**!`;
            }

            const botMsgDiv = document.createElement('div');
            botMsgDiv.className = 'ai-msg ai-msg-assistant';
            botMsgDiv.innerHTML = `
                <div class="ai-avatar-badge"><i class="fa fa-microchip"></i></div>
                <div class="ai-msg-bubble">${matchedAnswer}</div>
            `;
            container.appendChild(botMsgDiv);
            container.scrollTop = container.scrollHeight;
        }, 400);
    };

    function escapeHtml(string) {
        return String(string).replace(/[&<>"'`=\/]/g, function (s) {
            return {
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                '"': '&quot;',
                "'": '&#39;',
                '/': '&#x2F;',
                '`': '&#x60;',
                '=': '&#x3D;'
            }[s];
        });
    }

    // =========================================================================
    // 5. INTERACTIVE P99 LATENCY & CONCURRENCY SIMULATOR
    // =========================================================================
    window.initLatencySimulator = function () {
        const slider = document.getElementById('simStoreSlider');
        if (!slider) return;

        function updateSimulation() {
            const stores = parseInt(slider.value, 10);
            const ratio = (stores - 10) / (1621 - 10);

            // Compute metrics
            const tps = Math.round(14000 + ratio * 216000); // 14k -> 230k tps
            const legacyLatency = Math.round(210 + Math.pow(ratio, 1.4) * 1970); // 210ms -> 2,180ms
            const reactiveLatency = 170; // Flat 170ms P99 due to reactive caching & Kafka partition balancing

            // Update UI
            const elStores = document.getElementById('simDisplayStores');
            const elTps = document.getElementById('simDisplayTps');
            const elReactive = document.getElementById('simDisplayReactive');
            const elLegacy = document.getElementById('simDisplayLegacy');
            const elStatus = document.getElementById('simDisplayStatus');

            if (elStores) elStores.innerText = stores.toLocaleString();
            if (elTps) elTps.innerText = `${tps.toLocaleString()} TPS`;
            if (elReactive) elReactive.innerText = `${reactiveLatency}ms P99`;
            if (elLegacy) elLegacy.innerText = `${legacyLatency}ms`;

            if (elStatus) {
                if (stores < 300) {
                    elStatus.innerHTML = '<span class="status-pill status-healthy">LOW CONCURRENCY • OPTIMAL</span>';
                } else if (stores < 1000) {
                    elStatus.innerHTML = '<span class="status-pill status-healthy">ENTERPRISE SCALE • NON-BLOCKING RESILIENT</span>';
                } else {
                    elStatus.innerHTML = '<span class="status-pill status-peak">MAX PRODUCTION SCALE (1,621 STORES) • ZERO DROPPED TX</span>';
                }
            }

            // Legacy bar width & warning
            const legacyBar = document.getElementById('simLegacyBar');
            if (legacyBar) {
                const pct = Math.min(100, Math.round((legacyLatency / 2200) * 100));
                legacyBar.style.width = `${pct}%`;
                if (pct > 65) {
                    legacyBar.classList.add('critical');
                } else {
                    legacyBar.classList.remove('critical');
                }
            }
        }

        slider.addEventListener('input', updateSimulation);
        updateSimulation();
    };

    // =========================================================================
    // GLOBAL EVENT LISTENERS & INITIALIZATION
    // =========================================================================
    document.addEventListener('DOMContentLoaded', function () {
        // Init simulator if on page
        window.initLatencySimulator();

        // Keyboard Shortcut: Cmd+K / Ctrl+K
        document.addEventListener('keydown', function (e) {
            if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
                e.preventDefault();
                const palette = document.getElementById('commandPaletteModal');
                if (palette && palette.classList.contains('active')) {
                    window.closeCommandPalette();
                } else {
                    window.openCommandPalette();
                }
            }
            if (e.key === 'Escape') {
                window.closeCommandPalette();
                window.closeRecruiterModal();
                window.closeBlueprintModal();
            }
        });

        // Search Input Filter in Command Palette
        const cmdInput = document.getElementById('cmdPaletteInput');
        if (cmdInput) {
            cmdInput.addEventListener('input', function () {
                filterCommandItems(this.value);
            });

            cmdInput.addEventListener('keydown', function (e) {
                const visibleItems = Array.from(document.querySelectorAll('.cmd-item[style*="display: flex"]'));
                if (!visibleItems.length) return;

                const currentIdx = visibleItems.findIndex(el => el.classList.contains('selected'));

                if (e.key === 'ArrowDown') {
                    e.preventDefault();
                    const nextIdx = (currentIdx + 1) % visibleItems.length;
                    visibleItems.forEach(el => el.classList.remove('selected'));
                    visibleItems[nextIdx].classList.add('selected');
                    visibleItems[nextIdx].scrollIntoView({ block: 'nearest' });
                } else if (e.key === 'ArrowUp') {
                    e.preventDefault();
                    const prevIdx = (currentIdx - 1 + visibleItems.length) % visibleItems.length;
                    visibleItems.forEach(el => el.classList.remove('selected'));
                    visibleItems[prevIdx].classList.add('selected');
                    visibleItems[prevIdx].scrollIntoView({ block: 'nearest' });
                } else if (e.key === 'Enter') {
                    e.preventDefault();
                    if (currentIdx > -1) {
                        visibleItems[currentIdx].click();
                    }
                }
            });
        }

        // AI Twin Input Enter Key
        const aiInput = document.getElementById('aiTwinInput');
        if (aiInput) {
            aiInput.addEventListener('keydown', function (e) {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    window.sendAITwinMessage();
                }
            });
        }

        // Close backdrops on click
        document.querySelectorAll('.modal-custom-backdrop').forEach(bd => {
            bd.addEventListener('click', function () {
                window.closeCommandPalette();
                window.closeRecruiterModal();
                window.closeBlueprintModal();
            });
        });
    });

})();
