import Toast from "lightning/toast";

export default class Utils {
    static showToast = (firingComponent, toastTitle, toastBody, variant, mode) => {
        const config = {
            label: toastTitle,
            message: toastBody,
            variant: variant,
            mode: mode,
        };
        Toast.show(config, firingComponent);
    }
}
