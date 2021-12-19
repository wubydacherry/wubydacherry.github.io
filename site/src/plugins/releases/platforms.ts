import { defineComponent, shallowRef } from "vue";
import LogoAndroidIcon from "../../components/Icons/LogoAndroid.g.vue";
import LogoWindowsIcon from "../../components/Icons/LogoWindows.g.vue";
import LogoTuxIcon from "../../components/Icons/LogoTux.g.vue";
import FileTrayFullIcon from "../../components/Icons/FileTrayFull.g.vue";
import ArchiveIcon from "../../components/Icons/Archive.g.vue";

export const SupportedPlatforms = ["android", "windows", "linux"] as const;

export type ISupportedPlatforms = typeof SupportedPlatforms[number];

export interface IPlatformConfig {
    name: string;
    icon: ReturnType<typeof defineComponent>;
    userAgent: string;
    formats: {
        name: string;
        ext: string;
        icon: ReturnType<typeof defineComponent>;
    }[];
}

export const PlatformConfig: Record<ISupportedPlatforms, IPlatformConfig> = {
    android: {
        name: "Android",
        icon: shallowRef(LogoAndroidIcon),
        userAgent: "Android",
        formats: [
            {
                name: "Apk",
                ext: "apk",
                icon: shallowRef(FileTrayFullIcon),
            },
        ],
    },
    windows: {
        name: "Windows",
        icon: shallowRef(LogoWindowsIcon),
        userAgent: "Win",
        formats: [
            {
                name: "Installer",
                ext: "exe",
                icon: shallowRef(FileTrayFullIcon),
            },
            {
                name: "Archive",
                ext: "zip",
                icon: shallowRef(ArchiveIcon),
            },
        ],
    },
    linux: {
        name: "Linux",
        icon: shallowRef(LogoTuxIcon),
        userAgent: "Linux",
        formats: [
            {
                name: "AppImage",
                ext: "AppImage",
                icon: shallowRef(FileTrayFullIcon),
            },
        ],
    },
};

export const tryGetPlatformConfig = (platform: string) => {
    return PlatformConfig[platform as ISupportedPlatforms] as
        | IPlatformConfig
        | undefined;
};

export const getCurrentPlatform = () => {
    // @ts-ignore
    if (typeof navigator?.userAgentData?.platform === "string") {
        // @ts-ignore
        return (navigator.userAgentData.platform as string).toLowerCase();
    }

    for (const x of Object.values(PlatformConfig)) {
        if (navigator.userAgent.includes(x.userAgent)) {
            return x.name;
        }
    }
};
