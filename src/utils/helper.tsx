import { showMessage } from "react-native-flash-message";
import { FontFamily } from "../assets/fonts";
import { getFontSize } from "./responsive";
import Images from "../assets/images";
import { Image } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';

// ****** Show Error Message ******
export const showError = (message: any) => {
    showMessage({
        message,
        type: "danger",
        icon: "danger",
    });
};

// ****** Show Success Message ******
export const showSuccess = (message: any) => {
    showMessage({
        message,
        type: "success",
        icon: "success",
    });
};

// ****** Custom Success Message ******
export const showSuccessMessage = (message: any) => {
    showMessage({
        message: message,
        type: "success",
        icon: "success",
        autoHide: true,
        duration: 1500,

        titleStyle: {
            fontSize: getFontSize(16),
            fontFamily: FontFamily.nunitoBold,
        },
    });
};
// ****** Custom Success Message ******
export const showOTPSuccessMessage = (message: any) => {
    showMessage({
        message: message,
        type: "success",
        icon: "success",
        autoHide: true,
        duration: 1500,

        titleStyle: {
            fontSize: getFontSize(16),
            fontFamily: FontFamily.nunitoBold,
        },
    });
};
// ****** Custom Error Message ******
export const showErrorMessage = (message: any) => {
    showMessage({
        message: message,
        type: "danger",
        icon: "danger",
        autoHide: true,
        duration: 1500,
        animated: true,

        titleStyle: {
            // fontSize: getFontSize(16),
            // fontFamily: FontFamily.pfBold,
        },
    });
};

// ****** Custom Error Message ******
export const showWarningMessage = (message: any) => {
    showMessage({
        message: message,
        type: "warning",
        icon: "warning",
        autoHide: true,
        duration: 1500,
        animated: true,
        titleStyle: {
            // fontSize: getFontSize(16),
            // fontFamily: FontFamily.pfBold,
        },
    });
};
export const showSuccessMessageNew = (message?: any) => {
    showMessage({
        message: "Hello World",
        description: "This is our custom icon messagee",
        icon: <Ionicons name="home" size={24} color="red" />,
        // icon: Images.homeTab,
        type: "success",
    });
};
