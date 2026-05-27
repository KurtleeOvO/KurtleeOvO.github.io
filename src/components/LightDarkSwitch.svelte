<script lang="ts">
import { AUTO_MODE, DARK_MODE, LIGHT_MODE } from "@constants/constants.ts";
import I18nKey from "@i18n/i18nKey";
import { i18n } from "@i18n/translation";
import Icon from "@iconify/svelte";
import {
	applyThemeToDocument,
	getStoredTheme,
	setTheme,
} from "@utils/setting-utils.ts";
import { onMount } from "svelte";
import type { LIGHT_DARK_MODE } from "@/types/config.ts";

const seq: LIGHT_DARK_MODE[] = [LIGHT_MODE, DARK_MODE, AUTO_MODE];
let mode: LIGHT_DARK_MODE = $state(AUTO_MODE);
let animClass = $state<"idle" | "exit" | "enter">("idle");
let exitIcon = $state("");
let exitClass = $state(false);

onMount(() => {
	mode = getStoredTheme();
	const darkModePreference = window.matchMedia("(prefers-color-scheme: dark)");
	const changeThemeWhenSchemeChanged: Parameters<
		typeof darkModePreference.addEventListener<"change">
	>[1] = (_e) => {
		applyThemeToDocument(mode);
	};
	darkModePreference.addEventListener("change", changeThemeWhenSchemeChanged);
	return () => {
		darkModePreference.removeEventListener(
			"change",
			changeThemeWhenSchemeChanged,
		);
	};
});

function getIcon(m: LIGHT_DARK_MODE) {
	switch (m) {
		case LIGHT_MODE:
			return "material-symbols:wb-sunny-outline-rounded";
		case DARK_MODE:
			return "material-symbols:dark-mode-outline-rounded";
		default:
			return "material-symbols:radio-button-partial-outline";
	}
}

function switchScheme(newMode: LIGHT_DARK_MODE) {
	if (newMode === mode || animClass !== "idle") return;
	exitIcon = getIcon(mode);
	exitClass = true;
	animClass = "exit";
	setTimeout(() => {
		mode = newMode;
		setTheme(newMode);
		animClass = "enter";
	}, 200);
	setTimeout(() => {
		animClass = "idle";
		exitClass = false;
	}, 500);
}

function toggleScheme() {
	let i = 0;
	for (; i < seq.length; i++) {
		if (seq[i] === mode) {
			break;
		}
	}
	switchScheme(seq[(i + 1) % seq.length]);
}

function showPanel() {
	const panel = document.querySelector("#light-dark-panel");
	panel.classList.remove("float-panel-closed");
}

function hidePanel() {
	const panel = document.querySelector("#light-dark-panel");
	panel.classList.add("float-panel-closed");
}
</script>

<div class="relative z-50" role="menu" tabindex="-1" onmouseleave={hidePanel}>
    <button aria-label="Light/Dark Mode" role="menuitem"
            class="relative btn-plain scale-animation rounded-lg h-11 w-11 active:scale-90 overflow-hidden"
            id="scheme-switch" onclick={toggleScheme} onmouseenter={showPanel}>
        {#if exitClass}
            <div class="theme-icon-exit" class:animating={animClass === "exit"}>
                <Icon icon={exitIcon} class="text-[1.25rem]"></Icon>
            </div>
        {/if}
        <div class="theme-icon-main" class:entering={animClass === "enter"}>
            <Icon icon={getIcon(mode)} class="text-[1.25rem]"></Icon>
        </div>
    </button>

    <div id="light-dark-panel" class="hidden lg:block absolute transition float-panel-closed top-11 -right-2 pt-5" >
        <div class="card-base float-panel p-2">
            <button class="flex transition whitespace-nowrap items-center !justify-start w-full btn-plain scale-animation rounded-lg h-9 px-3 font-medium active:scale-95 mb-0.5"
                    class:current-theme-btn={mode === LIGHT_MODE}
                    onclick={() => switchScheme(LIGHT_MODE)}
            >
                <Icon icon="material-symbols:wb-sunny-outline-rounded" class="text-[1.25rem] mr-3"></Icon>
                {i18n(I18nKey.lightMode)}
            </button>
            <button class="flex transition whitespace-nowrap items-center !justify-start w-full btn-plain scale-animation rounded-lg h-9 px-3 font-medium active:scale-95 mb-0.5"
                    class:current-theme-btn={mode === DARK_MODE}
                    onclick={() => switchScheme(DARK_MODE)}
            >
                <Icon icon="material-symbols:dark-mode-outline-rounded" class="text-[1.25rem] mr-3"></Icon>
                {i18n(I18nKey.darkMode)}
            </button>
            <button class="flex transition whitespace-nowrap items-center !justify-start w-full btn-plain scale-animation rounded-lg h-9 px-3 font-medium active:scale-95"
                    class:current-theme-btn={mode === AUTO_MODE}
                    onclick={() => switchScheme(AUTO_MODE)}
            >
                <Icon icon="material-symbols:radio-button-partial-outline" class="text-[1.25rem] mr-3"></Icon>
                {i18n(I18nKey.systemMode)}
            </button>
        </div>
    </div>
</div>

<style>
    .theme-icon-main,
    .theme-icon-exit {
        position: absolute;
        inset: 0;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .theme-icon-main.entering {
        animation: icon-enter 0.3s ease-out forwards;
    }

    .theme-icon-exit.animating {
        animation: icon-exit 0.3s ease-out forwards;
    }

    @keyframes icon-enter {
        0% {
            clip-path: circle(0% at 100% 0%);
            opacity: 0;
        }
        100% {
            clip-path: circle(150% at 0% 100%);
            opacity: 1;
        }
    }

    @keyframes icon-exit {
        0% {
            clip-path: circle(150% at 100% 0%);
            opacity: 1;
        }
        100% {
            clip-path: circle(0% at 0% 100%);
            opacity: 0;
        }
    }
</style>
