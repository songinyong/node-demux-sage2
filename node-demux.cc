extern "C" {
	#include <libavcodec/avcodec.h>
	#include <libavformat/avformat.h>
	#include <libavutil/log.h>
}
#include <node.h>
#include "node-videodemux.h"

using namespace v8;

#if NODE_MODULE_VERSION >= NODE_12_0_MODULE_VERSION
NAN_MODULE_INIT(InitAll) {
#else
void InitAll(Handle<Object> exports) {
#endif

	// initialize libav
#if LIBAVCODEC_VERSION_MAJOR < 58
	av_register_all();
#endif
	av_log_set_level(AV_LOG_QUIET);
	
	// initialize node c++ objects
#if NODE_MODULE_VERSION >= NODE_12_0_MODULE_VERSION
	VideoDemux::Init(target);
#else
	VideoDemux::Init(exports);
#endif
}

NODE_MODULE(node_demux, InitAll)
