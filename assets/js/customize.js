$(document).ready(function () {

    const qrCode = new QRCodeStyling({
        width: 200,
        height: 200,
        margin :0,
        type: "svg",
        data: "https://qr-code-styling.com",
        image: "https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg",
        dotsOptions: {
            type: "extra-rounded",
            color: "#000b45",
            gradient: null
        },
        dotsOptionsHelper:{
            colorType:{
               single:true,
               gradient:false
            },
            gradient:{
               linear:true,
               radial:false,
               color1:"#6a1a4c",
               color2:"#FE7A36",
               rotation:0
            }
        },
        backgroundOptions: {
            color: "#ffffff"
        },
        cornersSquareOptions: {
            type: "extra-rounded",
            color: "#000000"
        },
        cornersDotOptions: {
            color: "#000000"
        },        
        imageOptions: {
            crossOrigin: "anonymous",
            hideBackgroundDots :true,
            imageSize:0.4,
            margin: 0
        }

    });
    qrCode.append(document.getElementById("canvas"));

    // Update Margin
    $("#inputMargin").on("input", function () {
        const marginValue = $("#inputMargin").val();
        qrCode.update({ margin: marginValue });
    });
    
    // Upload Image
    $('.putImage2').on('change', function () {
        var src = this;
        var target = document.getElementById('target2');
        target.style.width = '80px';
        target.style.height = '80px';
        target.style.objectFit = 'cover';
        target.style.marginTop = '10px';
        target.style.border = '1px solid #bdbdbd';
        target.style.boxShadow =  '3px 1px 5px rgba(0, 0, 0, .3)';
        var reader = new FileReader();

        reader.onload = function (e) {
            $('.uploadText').hide();
            $('#target2').attr('src', e.target.result);
            qrCode.update({ image: e.target.result });
        }
        reader.readAsDataURL(src.files[0]);
    });

    // Update Image Size
    $("#inputImageSize").on("input", function () {
        const inputImageSize = ($("#inputImageSize").val());
        qrCode.update({ imageOptions: { imageSize: inputImageSize } });
    });

    // Update Image Margin
    $("#inputImageMargin").on("input", function () {
        const inputImageMargin = ($("#inputImageMargin").val());
        qrCode.update({ imageOptions: { margin: inputImageMargin } });
    });

    // Update Hide Background Dots
    $("#ImageBackground").on("change", function () {
        const isChecked = $(this).is(":checked");
        qrCode.update({ imageOptions: { hideBackgroundDots: isChecked } });
    });

    // Update Dot Options
    $(".Pattern").on("change", function () {
        const pattern = $(this).attr("id");
        let patternValue;

        switch (pattern) {
            case "rounded":
                patternValue = { type: "rounded" };
                break;
            case "square":
                patternValue = { type: "square" };
                break;
            case "dots":
                patternValue = { type: "dots" };
                break;
            case "classy":
                patternValue = { type: "classy" };
                break;
            case "extra-rounded":
                patternValue = { type: "extra-rounded" };
                break;
            case "classy-rounded":
                patternValue = { type: "classy-rounded" };
                break;
            default:
                patternValue = { type: "extra-rounded" };
        }
        
        qrCode.update({ dotsOptions: patternValue });
    });

    // Update Dot Color
    $(".PatternTone").on("change", function () {
        const PatternTone = $(this).attr("id");
        if (PatternTone === "gradient") {
            $(".PatternSection").removeClass("d-none");
            $(".SingleColor").hide();
            qrCode.update({
                dotsOptions: {
                    type: "extra-rounded",
                    gradient: {
                        type: "linear",
                        rotation: 0,
                        colorStops: [
                            { offset: 0, color: "#6a1a4c" },
                            { offset: 1, color: "#FE7A36" }
                        ]
                    }
                },
                dotsOptionsHelper:{
                    colorType:{
                        single:false,
                        gradient:true
                    },
                    gradient:{
                        linear:true,
                        radial:false,
                        color1:"#6a1a4c",
                        color2:"#FE7A36",
                        rotation:0
                    }
                },
            });
        } else if (PatternTone === "single") {
            $(".PatternSection").addClass("d-none");
            $(".SingleColor").show();
            qrCode.update({ 
                dotsOptions: {
                    type: "extra-rounded",
                    color: "#000b45",
                    gradient: null,

                }
            });
        }
    });

    // DotSingleColor picker input
    $("#DotColor").on("input", function () {
        const singleColor = $(this).val();

        qrCode.update({
            dotsOptions: {
                type: "extra-rounded",
                color: singleColor,
                gradient: null
            }
        });
    });

    // DotGradientColor rotation input
    $("#GradientRotation").on("input", function () {
        const GradientRotation = $(this).val();

        qrCode.update({
            dotsOptions: {
                gradient: {
                    rotation: GradientRotation,
                }
            }
        });
    });

    // Update Dot Linear, Radial
    $(".dotColorStyle").on("change", function () {
        const selectedStyle = $(this).attr("data");
        let dotsStyle;

        switch (selectedStyle) {
            case "linear":
                dotsStyle = { gradient: { type: "linear" } };
                break;
            case "radial":
                dotsStyle = { gradient: { type: "radial" } };
                break;
            default:
                dotsStyle = { gradient: { type: "radial" } };
        }
        qrCode.update({ dotsOptions: dotsStyle });

    });

    // DotGradientColor1 picker input
    $("#GradientColor1").on("input", function () {
        const Color = $(this).val();
        const Color2 = $("#GradientColor2").val();
        qrCode.update({
            dotsOptions: {
                gradient: {
                    colorStops: [
                        { offset: 0, color: Color },
                        { offset: 1, color: Color2 }
                    ]
                }
            }
        });
    });

    // DotGradientColor2 picker input
    $("#GradientColor2").on("input", function () {
        const Color = $(this).val();
        const Color1 = $("#GradientColor1").val();
        qrCode.update({
            dotsOptions: {
                gradient: {
                    colorStops: [
                        { offset: 0, color: Color },
                        { offset: 1, color: Color1 }
                    ]
                }
            }
        });
    });

    $(".CornerSquare").on("change", function () {

        const CornerSquare = $(this).attr("id");
        let Value;
        
        switch (CornerSquare) {
            case "none":
                Value = { type: "none" };
                break;
            case "square":
                Value = { type: "square" };
                break;
            case "dots":
                Value = { type: "dots" };
                break;
            case "extra-rounded":
                Value = { type: "extra-rounded" };
                break;
            default:
                Value = { type: "extra-rounded" };
        }
        
        qrCode.update({ cornersSquareOptions: Value });
    });
    
    $(".CornerColorTone").on("change", function () {
        const CornerColorTone = $(this).attr("id");
    
        if (CornerColorTone === "gradient") {
            $(".CornerSingleColor").hide();
            $(".CornerGradientColor").removeClass("d-none");
            qrCode.update({
                cornersSquareOptions: {
                    type: "extra-rounded",
                    gradient: {
                        type: "linear",
                        rotation: 0,
                        colorStops: [
                            { offset: 0, color: "#6a1a4c" },
                            { offset: 1, color: "#FE7A36" }
                        ]
                    }
                },
                cornersSquareOptionsHelper: {
                    colorType: {
                        single: false,
                        gradient: true
                    },
                    gradient: {
                        linear: true,
                        radial: false,
                        color1: "#6a1a4c",
                        color2: "#FE7A36",
                        rotation: 0
                    }
                }
            });
        } else if (CornerColorTone === "single") {
            $(".CornerSingleColor").show();
            $(".CornerGradientColor").addClass("d-none");
            qrCode.update({
                cornersSquareOptions: {
                    type: "extra-rounded",
                    gradient: null,
                    color: "#000b45"
                },
                cornersSquareOptionsHelper: {
                    colorType: {
                        single: true,
                        gradient: false
                    },
                    gradient: {
                        linear: true,
                        radial: false,
                        color1: "#000b45",
                        color2: "#000b45",
                        rotation: 0
                    }
                }
            });
        }
    });
    
    $("#CornerSingleColor").on("input", function () {
        const singleColor = $(this).val();  

        qrCode.update({
            cornersSquareOptions: {
                type: "extra-rounded",
                color: singleColor,
                gradient: null
            }
        });
    });

    $(".CornerGradient").on("change", function () {
        const selectedStyle = $(this).attr("data");
        let dotsStyle;

        switch (selectedStyle) {
            case "linear":
                dotsStyle = { gradient: { type: "linear" } };
                break;
            case "radial":
                dotsStyle = { gradient: { type: "radial" } };
                break;
            default:
                dotsStyle = { gradient: { type: "radial" } };
        }
        qrCode.update({ cornersSquareOptions: dotsStyle });

    });

    $("#CornerGradient1").on("input", function () {
        const Color = $(this).val();
        const Color2 = $("#CornerGradient2").val();

        qrCode.update({
            cornersSquareOptions: {
                gradient: {
                    colorStops: [
                        { offset: 0, color: Color },
                        { offset: 1, color: Color2 }
                    ]
                }
            }
        });
    });

    $("#CornerGradient2").on("input", function () {
        const Color = $(this).val();
        console.log(Color);

        const Color1 = $("#CornerGradient1").val();
        qrCode.update({
            cornersSquareOptions: {
                gradient: {
                    colorStops: [
                        { offset: 0, color: Color },
                        { offset: 1, color: Color1 }
                    ]
                }
            }
        });
    });

    $("#CornerGradientRotation").on("input", function () {
        const GradientRotation = $(this).val();

        qrCode.update({
            cornersSquareOptions: {
                gradient: {
                    rotation: GradientRotation,
                }
            }
        });
    });

    // Corner dot center option
    $(".CornerCenterDot").on("change", function () {
        const cornerType = $(this).attr("id");
        let cornerDot;
        
        switch (cornerType) {
            case "none":
                cornerDot = { type: "none" };
                break;
            case "square":
                cornerDot = { type: "square" };
                break;
            case "dots":
                cornerDot = { type: "dots" };
                break;
            default:
                cornerDot = { type: "dots" };
        }
        
        qrCode.update({ cornersDotOptions: cornerDot });
    });

    $(".CornerCenterDotTone").on("change", function () {
        const CornerCenterDotTone = $(this).attr("id");
    
        if (CornerCenterDotTone === "gradient") {
            $(".CornerCenterSingleTone").hide();
            $(".CornerCenterGradientTone").removeClass("d-none");
            qrCode.update({
                cornersDotOptions: {
                    type: "dot",
                    gradient: {
                        type: "linear",
                        rotation: 0,
                        colorStops: [
                            { offset: 0, color: "#6a1a4c" },
                            { offset: 1, color: "#FE7A36" }
                        ]
                    }
                },
                cornersDotOptionsHelper: {
                    colorType: {
                        single: false,
                        gradient: true
                    },
                    gradient: {
                        linear: true,
                        radial: false,
                        color1: "#6a1a4c",
                        color2: "#FE7A36",
                        rotation: 0
                    }
                }
            });
        } else if (CornerCenterDotTone === "single") {
            $(".CornerCenterSingleTone").show();
            $(".CornerCenterGradientTone").addClass("d-none");
            qrCode.update({
                cornersDotOptions: {
                    type: "extra-rounded",
                    gradient: null,
                    color: "#000b45"
                },
                cornersDotOptionsHelper: {
                    colorType: {
                        single: true,
                        gradient: false
                    },
                    gradient: {
                        linear: true,
                        radial: false,
                        color1: "#000b45",
                        color2: "#000b45",
                        rotation: 0
                    }
                }
            });
        }
    });

    $(".CornerCenterGradient").on("change", function () {
        const selectedStyle = $(this).attr("data");
        let dotsStyle;

        switch (selectedStyle) {
            case "linear":
                dotsStyle = { gradient: { type: "linear" } };
                break;
            case "radial":
                dotsStyle = { gradient: { type: "radial" } };
                break;
            default:
                dotsStyle = { gradient: { type: "radial" } };
        }
        qrCode.update({ cornersDotOptions: dotsStyle });

    });

    $("#CornerCenterGradient1").on("input", function () {
        const Color = $(this).val();
        const Color2 = $("#CornerCenterGradient2").val();

        qrCode.update({
            cornersDotOptions: {
                gradient: {
                    colorStops: [
                        { offset: 0, color: Color },
                        { offset: 1, color: Color2 }
                    ]
                }
            }
        });
    });

    $("#CornerCenterGradient2").on("input", function () {
        const Color = $(this).val();
        const Color1 = $("#CornerCenterGradient1").val();

        qrCode.update({
            cornersDotOptions: {
                gradient: {
                    colorStops: [
                        { offset: 0, color: Color },
                        { offset: 1, color: Color1 }
                    ]
                }
            }
        });
    });

    $("#CornerCenterSingleColor").on("input", function () {
        const singleColor = $(this).val();  

        qrCode.update({
            cornersDotOptions: {
                type: "dot",
                color: singleColor,
                gradient: null
            }
        });
    });

    $("#CornerCenterGradientRotation").on("input", function () {
        const GradientRotation = $(this).val();

        qrCode.update({
            cornersDotOptions: {
                gradient: {
                    rotation: GradientRotation,
                }
            }
        });
    });

    // Background-color
    $(".BackgroundColor").on("change", function () {
        const BackgroundColor = $(this).attr("id");

        if (BackgroundColor === "gradient") {
            $(".BackgroundSingleSection").hide();
            $(".BackgroundGradientSection").removeClass("d-none");
            qrCode.update({
                backgroundOptions: {
                    gradient: {
                        type: "linear",
                        rotation: 0,
                        colorStops: [
                            { offset: 0, color: "#6a1a4c" },
                            { offset: 1, color: "#FE7A36" }
                        ]
                    }
                },
                backgroundOptionsHelper: {
                    colorType: {
                        single: false,
                        gradient: true
                    },
                    gradient: {
                        linear: true,
                        radial: false,
                        color1: "#6a1a4c",
                        color2: "#FE7A36",
                        rotation: 0
                    }
                }
            });
        } else if (BackgroundColor === "single") {
            $(".BackgroundSingleSection").show();
            $(".BackgroundGradientSection").addClass("d-none");
            qrCode.update({
                backgroundOptions: {
                    gradient: null,
                    color: "#000b45"
                },
                backgroundOptionsHelper: {
                    colorType: {
                        single: true,
                        gradient: false
                    },
                    gradient: {
                        linear: true,
                        radial: false,
                        color1: "#000b45",
                        color2: "#000b45",
                        rotation: 0
                    }
                }
            });
        }
    });

    $("#BackgroundSingleColor").on("input", function () {
        const singleColor = $(this).val();  
    
        qrCode.update({
            backgroundOptions: {
                type: "extra-rounded",
                color: singleColor,
                gradient: null
            }
        });
    });

    $(".QrbgGradientStyle").on("change", function () {
        const selectedStyle = $(this).attr("id");
        let gradientStyle;
    
        switch (selectedStyle) {
            case "linear":
                gradientStyle = {
                    type: "linear",
                    rotation: 0,
                    colorStops: [
                        { offset: 0, color: "#ffffff" },
                        { offset: 1, color: "#d2ec09" }
                    ]
                };
                break;
            case "radial":
                gradientStyle = {
                    type: "radial",
                    colorStops: [
                        { offset: 0, color: "#ffffff" },
                        { offset: 1, color: "#d2ec09" }
                    ]
                };
                break;
            default:
                gradientStyle = {
                    type: "linear",
                    rotation: 0,
                    colorStops: [
                        { offset: 0, color: "#ffffff" },
                        { offset: 1, color: "#d2ec09" }
                    ]
                };
        }
    
        qrCode.update({
            backgroundOptions: { gradient: gradientStyle }
        });
    });
    
    $("#BgGradient1").on("input", function () {
        const Color = $(this).val();
        const Color2 = $("#BgGradient2").val();

        qrCode.update({
            backgroundOptions: {
                gradient: {
                    colorStops: [
                        { offset: 0, color: Color },
                        { offset: 1, color: Color2 }
                    ]
                }
            }
        });
    });

    $("#BgGradient2").on("input", function () {
        const Color = $(this).val();
        const Color1 = $("#BgGradient1").val();

        qrCode.update({
            backgroundOptions: {
                gradient: {
                    colorStops: [
                        { offset: 0, color: Color },
                        { offset: 1, color: Color1 }
                    ]
                }
            }
        });
    });

    $("#BgGradientRotation").on("input", function () {
        const GradientRotation = $(this).val();

        qrCode.update({
            backgroundOptions: {
                gradient: {
                    rotation: GradientRotation,
                }
            }
        });
    });


});
