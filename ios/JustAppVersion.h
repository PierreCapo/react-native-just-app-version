
#ifdef RCT_NEW_ARCH_ENABLED
#import "RNJustAppVersionSpec.h"

@interface JustAppVersion : NSObject <NativeJustAppVersionSpec>
#else
#import <React/RCTBridgeModule.h>

@interface JustAppVersion : NSObject <RCTBridgeModule>
#endif

@end
