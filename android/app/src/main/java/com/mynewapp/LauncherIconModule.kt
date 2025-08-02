package com.mynewapp

import android.content.ComponentName
import android.content.pm.PackageManager
import com.facebook.react.bridge.*

class LauncherIconModule(private val reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String {
        return "LauncherIconModule"
    }

@ReactMethod
fun changeIcon(iconName: String, promise: Promise) {
    try {
        val packageManager = reactContext.packageManager
        val packageName = reactContext.packageName

        val defaultActivity = ComponentName(packageName, "$packageName.MainActivity")
        val premiumIcon = ComponentName(packageName, "$packageName.premiumIcon")

        // Disable both
        packageManager.setComponentEnabledSetting(
            defaultActivity,
            PackageManager.COMPONENT_ENABLED_STATE_DISABLED,
            PackageManager.DONT_KILL_APP
        )
        packageManager.setComponentEnabledSetting(
            premiumIcon,
            PackageManager.COMPONENT_ENABLED_STATE_DISABLED,
            PackageManager.DONT_KILL_APP
        )

        // Enable selected
        val target = if (iconName == "premiumIcon") premiumIcon else defaultActivity
        packageManager.setComponentEnabledSetting(
            target,
            PackageManager.COMPONENT_ENABLED_STATE_ENABLED,
            PackageManager.DONT_KILL_APP
        )

        promise.resolve("Switched icon to $iconName")
    } catch (e: Exception) {
        promise.reject("CHANGE_ICON_ERROR", "Error changing icon", e)
    }
}


}
