#import "JustAppVersion.h"

@implementation JustAppVersion
RCT_EXPORT_MODULE()

RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD(getAppVersion)
{
    return [[[NSBundle mainBundle] infoDictionary] objectForKey:@"CFBundleShortVersionString"];
}

RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD(getBuildNumber)
{
    NSString *buildNumberString = [[[NSBundle mainBundle] infoDictionary] objectForKey:(NSString *)kCFBundleVersionKey];
    return @([buildNumberString intValue]);
}

// Don't compile this code when we build for the old architecture.
#ifdef RCT_NEW_ARCH_ENABLED
- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:
    (const facebook::react::ObjCTurboModule::InitParams &)params
{
    return std::make_shared<facebook::react::NativeJustAppVersionSpecJSI>(params);
}
#endif

@end
