<script>
    const props = $props()

    const text = $derived(props.text ?? props.init_text ?? "")
    const busyText = $derived(props.busyText ?? props.clicked_text ?? "...")
    const onClick = $derived(props.onClick ?? props.on_click)
    const canSend = $derived(props.canSend ?? props.can_send ?? true)

    const color = $derived(props.color ?? "#fed450")
    const textColor = $derived(props.textColor ?? "#231f20")
    const className = $derived(props.className ?? "")

    let isHover = $state(false)
    let isFocus = $state(false)
</script>

<button
    disabled={!canSend}
    class={"rb relative w-full mt-8 overflow-hidden border-3 text-2xl " + className}
    style={"--rb-accent:" + color + "; --rb-text:" + textColor}
    onclick={(event) => {
        if (!canSend) return
        onClick?.(event)

        // On mobile (and some desktop browsers), click can leave the element focused,
        // which effectively "sticks" the hover/focus styling. Clear it so we return
        // to the regular state immediately after clicking.
        isHover = false
        isFocus = false
        event.currentTarget?.blur?.()
    }}
    onpointerenter={() => (isHover = true)}
    onpointerleave={() => (isHover = false)}
    onfocus={() => (isFocus = true)}
    onblur={() => (isFocus = false)}
    data-active={(canSend && (isHover || isFocus)) ? "true" : "false"}
    data-busy={!canSend ? "true" : "false"}
>
    <span class="rb_label">
        <span class="rb_labelInner" style={"transform: translateY(" + (canSend ? "0%" : "-50%") + ");"}>
            <span class="rb_line">{text}</span>
            <span class="rb_line">{busyText}</span>
        </span>
    </span>
</button>

<style>
    .rb {
        color: var(--rb-text);
        border-color: var(--rb-accent);
        background: var(--rb-accent);
        padding: 0.5rem 2rem;
        cursor: pointer;
        transform: translateZ(0);
        user-select: none;
        -webkit-tap-highlight-color: transparent;
        transition:
            transform 120ms ease,
            opacity 120ms ease,
            background-color 180ms ease,
            border-color 180ms ease,
            color 180ms ease,
            box-shadow 180ms ease,
            filter 180ms ease;
    }

    .rb:active {
        transform: scale(0.98);
    }

    .rb:disabled {
        cursor: not-allowed;
        opacity: 0.85;
    }

    .rb[data-active="true"] {
        background-color: color-mix(in oklab, var(--rb-accent), black 18%);
        border-color: color-mix(in oklab, var(--rb-accent), black 22%);
        color: #ffffff;
        box-shadow: 0 10px 24px rgba(0, 0, 0, 0.25);
    }

    .rb_label {
        position: relative;
        z-index: 2;
        display: block;
        line-height: 1.2;
        height: 1.2em;
        overflow: hidden;
        text-align: center;
    }

    .rb_labelInner {
        display: block;
        transition: transform 180ms ease;
    }

    .rb_line {
        display: block;
        height: 1.2em;
        white-space: nowrap;
    }
</style>