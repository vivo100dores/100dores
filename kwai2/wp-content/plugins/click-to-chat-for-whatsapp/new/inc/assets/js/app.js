(() => {
    var t;
    (t = jQuery)((function() {
        var e = window.location.href,
            c = void 0 !== document.title ? document.title : "",
            n = "no";
        try {
            n = void 0 !== navigator.userAgent && navigator.userAgent.match(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i) ? "yes" : "no"
        } catch (t) {}
        "no" == n && (n = void 0 !== screen.width && screen.width > 1025 ? "no" : "yes");
        var a = "",
            _ = {};

        function o() {
            localStorage.getItem("ht_ctc_storage") && (_ = localStorage.getItem("ht_ctc_storage"), _ = JSON.parse(_))
        }

        function i(t) {
            return !!_[t] && _[t]
        }

        function r(t, e) {
            o(), _[t] = e;
            var c = JSON.stringify(_);
            localStorage.setItem("ht_ctc_storage", c)
        }
        o();
        var s = "";
        ! function() {
            if ("undefined" != typeof ht_ctc_chat_var) s = ht_ctc_chat_var;
            else try {
                if (document.querySelector(".ht_ctc_chat_data")) {
                    var e = t(".ht_ctc_chat_data").attr("data-settings");
                    s = JSON.parse(e), window.ht_ctc_chat_var = s
                }
            } catch (t) {
                s = {}
            }
        }();
        var h, u = {};

        function d() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "open";
            f(), t(".ctc_cta_stick").remove(), "init" == e ? t(".ht_ctc_chat_greetings_box").show(70) : t(".ht_ctc_chat_greetings_box").show(400), t(".ht_ctc_chat_greetings_box").addClass("ctc_greetings_opened").removeClass("ctc_greetings_closed"), r("g_action", e), "user_opened" == e && r("g_user_action", e)
        }

        function l() {
            setTimeout((function() {
                g("chat_clicked")
            }), 500)
        }

        function g() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "close";
            "element" == e ? t(".ht_ctc_chat_greetings_box").hide(70) : t(".ht_ctc_chat_greetings_box").hide(400), t(".ht_ctc_chat_greetings_box").addClass("ctc_greetings_closed").removeClass("ctc_greetings_opened"), r("g_action", e), "user_closed" == e && r("g_user_action", e)
        }

        function p(t) {
            var e;
            "yes" == n ? "show" == s.dis_m && ((e = document.querySelector(".ht_ctc_desktop_chat")) && e.remove(), t.style.cssText = s.pos_m + s.css, v(t)) : "show" == s.dis_d && ((e = document.querySelector(".ht_ctc_mobile_chat")) && e.remove(), t.style.cssText = s.pos_d + s.css, v(t))
        }

        function v(e) {
            try {
                t(e).show(parseInt(s.se))
            } catch (t) {
                e.style.display = "block"
            }! function() {
                if (t(".ht_ctc_chat_greetings_box").length) {
                    if (s.g_device) {
                        if ("yes" !== n && "mobile" == s.g_device) return void t(".ht_ctc_chat_greetings_box").remove();
                        if ("yes" == n && "desktop" == s.g_device) return void t(".ht_ctc_chat_greetings_box").remove()
                    }
                    document.dispatchEvent(new CustomEvent("ht_ctc_event_after_chat_displayed", {
                        detail: {
                            ctc: s,
                            greetings_open: d,
                            greetings_close: g
                        }
                    })), s.g_init && "user_closed" !== i("g_user_action") && ("default" == s.g_init ? "yes" !== n && d("init") : "open" == s.g_init && d("init")), t(document).on("click", '.ctc_greetings, #ctc_greetings, .ctc_greetings_now, [href="#ctc_greetings"]', (function(t) {
                        t.preventDefault(), g("element"), d("element")
                    }))
                }
            }(),
            function() {
                if (document.querySelector(".ht_ctc_notification") && "stop" !== i("n_badge")) {
                    if (document.querySelector(".ctc_nb")) {
                        var e = t(".ht_ctc_badge").closest(".ht_ctc_style");
                        t(".ht_ctc_badge").css({
                            top: t(e).find(".ctc_nb").attr("data-nb_top"),
                            right: t(e).find(".ctc_nb").attr("data-nb_right")
                        })
                    }
                    var c = s.n_time ? 1e3 * s.n_time : "150";
                    setTimeout((function() {
                        t(".ht_ctc_notification").show(400)
                    }), c)
                }
            }(),
            function(e) {
                var c = t(e).hasClass("ht_ctc_entry_animation") ? 1200 : 120;
                setTimeout((function() {
                    e.classList.add("ht_ctc_animation", s.ani)
                }), c), t(".ht-ctc-chat").hover((function() {
                    t(".ht-ctc-chat .ht-ctc-cta-hover").show(120)
                }), (function() {
                    t(".ht-ctc-chat .ht-ctc-cta-hover").hide(100)
                }))
            }(e)
        }

        function m() {
            t(".for_greetings_header_image_badge").length && (t(".for_greetings_header_image_badge").addClass("g_header_badge_online"), t(".for_greetings_header_image_badge").show())
        }

        function f() {
            document.querySelector(".ht_ctc_notification") && (r("n_badge", "stop"), t(".ht_ctc_notification").remove())
        }

        function y(_) {
            document.dispatchEvent(new CustomEvent("ht_ctc_event_number", {
                detail: {
                    ctc: s
                }
            }));
            var o = s.number,
                i = s.pre_filled;
            _.hasAttribute("data-number") && "" !== _.getAttribute("data-number") && (o = _.getAttribute("data-number")), _.hasAttribute("data-pre_filled") && (i = _.getAttribute("data-pre_filled"));
            try {
                i = i.replaceAll("%", "%25");
                var r = window.location.href;
                i = i.replace(/\[url]/gi, r), i = encodeURIComponent(decodeURI(i))
            } catch (t) {}
            if ("" != o) {
                var h = "https://wa.me/" + o + "?text=" + i,
                    d = s.url_target_d ? s.url_target_d : "_blank";
                "yes" == n ? (s.url_structure_m && (h = "whatsapp://send?phone=" + o + "&text=" + i, d = "_self"), s.custom_url_m && "" !== s.custom_url_m && (h = s.custom_url_m)) : (s.url_structure_d && (h = "https://web.whatsapp.com/send?phone=" + o + "&text=" + i), s.custom_url_d && "" !== s.custom_url_d && (h = s.custom_url_d));
                var l = "popup" == d ? "scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,width=788,height=514,left=100,top=100" : "noopener";
                window.open(h, d, l), s.chat_number = o,
                    function() {
                        if (s.analytics && "session" == s.analytics) {
                            if (sessionStorage.getItem("ht_ctc_analytics")) return;
                            sessionStorage.setItem("ht_ctc_analytics", "done")
                        }

                        function t(t) {
                            var n = s.chat_number && "" !== s.chat_number ? s.chat_number : s.number;
                            try {
                                document.dispatchEvent(new CustomEvent("ht_ctc_event_apply_variables", {
                                    detail: {
                                        v: t
                                    }
                                })), t = (t = (t = (t = void 0 !== window.apply_variables_value ? window.apply_variables_value : t).replace("{number}", n)).replace("{title}", c)).replace("{url}", e)
                            } catch (t) {}
                            return t
                        }
                        document.dispatchEvent(new CustomEvent("ht_ctc_event_analytics"));
                        var n = s.chat_number && "" !== s.chat_number ? s.chat_number : s.number,
                            a = {},
                            _ = "Click to Chat for WhatsApp",
                            o = "chat: " + n,
                            i = c + ", " + e;
                        if (s.ga) {
                            var r = s.g_an_event_name && "" !== s.g_an_event_name ? s.g_an_event_name : "click to chat";
                            r = t(r), u.g_an_params && u.g_an_params.forEach((function(e) {
                                if (u[e]) {
                                    var c = u[e],
                                        n = c.key,
                                        _ = c.value;
                                    n = t(n), _ = t(_), a[n] = _
                                }
                            }));
                            var h = 0,
                                d = "no";
                            if ("undefined" != typeof dataLayer) try {
                                var l = function(t) {
                                    t = t.toUpperCase(), g.includes(t) || (g.push(t), (t.startsWith("G-") || t.startsWith("GT-")) && (a.send_to = t, gtag("event", r, a), h++))
                                };
                                "undefined" == typeof gtag && (window.gtag = function() {
                                    dataLayer.push(arguments)
                                }, d = "yes");
                                var g = [];
                                if (window.google_tag_data && window.google_tag_data.tidr && window.google_tag_data.tidr.destination)
                                    for (var p in window.google_tag_data.tidr.destination) l(p);
                                dataLayer.forEach((function(t) {
                                    "config" == t[0] && t[1] && (p = t[1], l(p))
                                }))
                            } catch (t) {}
                            0 == h && "no" == d && ("undefined" != typeof gtag ? gtag("event", r, a) : "undefined" != typeof ga && void 0 !== ga.getAll ? ga.getAll()[0].send("event", _, o, i) : "undefined" != typeof __gaTracker && __gaTracker("send", "event", _, o, i))
                        }
                        if ("undefined" != typeof dataLayer && dataLayer.push({
                                event: "Click to Chat",
                                type: "chat",
                                number: n,
                                title: c,
                                url: e,
                                event_category: _,
                                event_label: i,
                                event_action: o,
                                ref: "dataLayer push"
                            }), s.ads && "undefined" != typeof gtag_report_conversion && gtag_report_conversion(), s.fb && "undefined" != typeof fbq) {
                            var v = s.pixel_event_name && "" !== s.pixel_event_name ? s.pixel_event_name : "Click to Chat by HoliThemes",
                                m = u.pixel_event_type && "" !== u.pixel_event_type ? u.pixel_event_type : "trackCustom",
                                f = {};
                            u.pixel_params && u.pixel_params.forEach((function(e) {
                                if (u[e]) {
                                    var c = u[e],
                                        n = c.key,
                                        a = c.value;
                                    n = t(n), a = t(a), f[n] = a
                                }
                            })), fbq(m, v, f)
                        }
                    }(),
                    function(e) {
                        if (s.hook_url) {
                            var c = {};
                            if (s.hook_v) {
                                c = void 0 !== b ? b : s.hook_v;
                                var n = {},
                                    a = 1;
                                c.forEach((function(t) {
                                    n["value" + a] = t, a++
                                })), s.hook_v = n
                            }
                            document.dispatchEvent(new CustomEvent("ht_ctc_event_hook", {
                                detail: {
                                    ctc: s,
                                    number: e
                                }
                            }));
                            var _ = s.hook_url;
                            if (c = s.hook_v, s.webhook_format && "json" == s.webhook_format) var o = c;
                            else o = JSON.stringify(c);
                            t.ajax({
                                url: _,
                                type: "POST",
                                mode: "no-cors",
                                data: o,
                                success: function(t) {}
                            })
                        }
                    }(o), f()
            } else t(".ht-ctc-chat").html(a)
        }
        "undefined" != typeof ht_ctc_variables ? u = ht_ctc_variables : (u = {
                g_an_event_name: "click to chat",
                pixel_event_name: "Click to Chat by HoliThemes",
                pixel_event_type: "trackCustom",
                g_an_params: ["g_an_param_1", "g_an_param_2", "g_an_param_3"],
                g_an_param_1: {
                    key: "number",
                    value: "{number}"
                },
                g_an_param_2: {
                    key: "title",
                    value: "{title}"
                },
                g_an_param_3: {
                    key: "url",
                    value: "{url}"
                },
                pixel_params: ["pixel_param_1", "pixel_param_2", "pixel_param_3", "pixel_param_4"],
                pixel_param_1: {
                    key: "Category",
                    value: "Click to Chat for WhatsApp"
                },
                pixel_param_2: {
                    key: "return_type",
                    value: "chat"
                },
                pixel_param_3: {
                    key: "ID",
                    value: "{number}"
                },
                pixel_param_4: {
                    key: "Title",
                    value: "{title}"
                }
            }, window.ht_ctc_variables = u),
            function() {
                var e = document.querySelector(".ht_ctc_chat_data");
                e && (a = t(".ht_ctc_chat_data").attr("data-no_number"), e.remove())
            }(), document.dispatchEvent(new CustomEvent("ht_ctc_event_settings", {
                detail: {
                    ctc: s
                }
            })), (h = document.querySelector(".ht-ctc-chat")) && (document.dispatchEvent(new CustomEvent("ht_ctc_event_chat")), function(t) {
                "yes" == s.schedule ? document.dispatchEvent(new CustomEvent("ht_ctc_event_display", {
                    detail: {
                        ctc: s,
                        display_chat: p,
                        ht_ctc_chat: t,
                        online_content: m
                    }
                })) : (p(t), m())
            }(h), h.addEventListener("click", (function() {
                t(".ht_ctc_chat_greetings_box").length || y(h)
            })), t(".ht_ctc_chat_greetings_box").length && t(document).on("click", ".ht_ctc_chat_style", (function(e) {
                t(".ht_ctc_chat_greetings_box").hasClass("ctc_greetings_opened") ? g("user_closed") : d("user_opened")
            })), t(document).on("click", ".ctc_greetings_close_btn", (function(t) {
                g("user_closed")
            })), t(document).on("click", ".ht_ctc_chat_greetings_box_link", (function(e) {
                e.preventDefault(), document.querySelector("#ctc_opt") ? t("#ctc_opt").is(":checked") || i("g_optin") ? (y(h), l()) : t(".ctc_opt_in").show(400).fadeOut("1").fadeIn("1") : (y(h), l()), document.dispatchEvent(new CustomEvent("ht_ctc_event_greetings"))
            })), document.querySelector("#ctc_opt") && t("#ctc_opt").on("change", (function(e) {
                t("#ctc_opt").is(":checked") && (t(".ctc_opt_in").hide(100), r("g_optin", "y"), setTimeout((function() {
                    y(h), l()
                }), 500))
            }))), t(document).on("click", ".ht-ctc-sc-chat", (function() {
                y(this)
            })), t(document).on("click", ".ctc_chat, #ctc_chat", (function(e) {
                y(this), t(this).hasClass("ctc_woo_place") && e.preventDefault()
            })), t(document).on("click", '[href="#ctc_chat"]', (function(t) {
                t.preventDefault(), y(this)
            }));
        var b = s.hook_v ? s.hook_v : ""
    }))
})();