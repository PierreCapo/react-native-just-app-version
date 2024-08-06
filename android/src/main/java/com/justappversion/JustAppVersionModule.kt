package com.justappversion

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Promise
import android.content.pm.PackageManager

class JustAppVersionModule internal constructor(context: ReactApplicationContext) :
  JustAppVersionSpec(context) {

  override fun getName(): String {
    return NAME
  }

  @ReactMethod(isBlockingSynchronousMethod = true)
  override fun getAppVersion(): String {
    return try {
      val packageInfo = reactApplicationContext.packageManager.getPackageInfo(
        reactApplicationContext.packageName,
        0
      )
      packageInfo.versionName
    } catch (e: PackageManager.NameNotFoundException) {
      e.printStackTrace()
      ""
    }
  }

  @ReactMethod(isBlockingSynchronousMethod = true)
  override fun getBuildNumber(): Double {
    return try {
      val packageInfo = reactApplicationContext.packageManager.getPackageInfo(
        reactApplicationContext.packageName,
        0
      )
      val versionCode: Int
      versionCode = if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.P) {
        packageInfo.longVersionCode.toInt() // .toInt() is required because longVersionCode is of type Long
      } else {
        @Suppress("DEPRECATION")
        packageInfo.versionCode
      }
      return versionCode.toDouble()
    } catch (e: PackageManager.NameNotFoundException) {
      e.printStackTrace()
      0.toDouble()
    }
  }

  companion object {
    const val NAME = "JustAppVersion"
  }
}
