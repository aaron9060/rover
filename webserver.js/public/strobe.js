	// Create a StrobeMediaPlayback configuration 
	var parameters = {  
		src: "rtmp://" + window.location.hostname + "/flvplayback/myStream",  
		autoPlay: true,  
		controlBarAutoHide: false,  
		playButtonOverlay: true,  
		// controlBarMode : "none",
		streamType : "live",
		showVideoInfoOverlayOnStartUp: true,  
		optimizeBuffering : false,  
		initialBufferTime : 0.1,  
		expandedBufferTime : 0.1,  
		minContinuousPlayback : 0.1,  
		poster: "strobe/images/poster.png"  
	};  
	  // Embed the player SWF:		  
	swfobject.embedSWF
		( "strobe/StrobeMediaPlayback.swf"
		, "strobeMediaPlayback"
		, 640
		, 480
		, "10.1.0"
		, {}
		, parameters
		, { allowFullScreen: "true"}
		, { name: "strobeMediaPlayback" }
	);	  
	