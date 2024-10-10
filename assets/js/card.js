$(document).ready(function () {

  $('.hoverImg').each(function() {
    var frontImage = $(this).attr('frontImg');
    $(this).attr('src', frontImage);
});

// Add hover functionality
$('.hoverImg').hover(
  function() {
      var backImage = $(this).attr('backImg');
      $(this).attr('src', backImage);
  },
  function() {
      var frontImage = $(this).attr('frontImg');
      $(this).attr('src', frontImage);
  }
);

$('.template-list img').on('click', function() {

  var frontImage =  $(this).attr('frontImg');
  var backImage =  $(this).attr('backImg');

  $('.frontBg').css({
    'background-image': 'url("' + frontImage + '")',
    'background-repeat': 'no-repeat',
    'background-size': 'cover'
  });

  $('.backBg').css({
    'background-image': 'url("' + backImage + '")',
    'background-repeat': 'no-repeat',
    'background-size': 'cover'
  });

});





  // Upload Image
  $(".putImage1").on("change", function () {
    var src = this;
    var target = document.getElementById("target1");
    target.style.width = "80px";
    target.style.height = "80px";
    target.style.objectFit = "cover";
    target.style.marginTop = "10px";
    target.style.border = "1px solid #bdbdbd";
    target.style.boxShadow = "3px 1px 5px rgba(0, 0, 0, .3)";
    var reader = new FileReader();

    reader.onload = function (e) {
      $(".uploadText").hide();
      $("#target1").attr("src", e.target.result);

      // Update custom background color based
      if ($("#frontBgImg").prop("checked")) {
        $(".frontBg").css({
          "background-image": "url(" + e.target.result + ")",
          "background-size": "cover",
          "background-color": "",
        });
      } else if ($("#backBgImg").prop("checked")) {
        $(".backBg").css({
          "background-image": "url(" + e.target.result + ")",
          "background-size": "cover",
          "background-color": "",
        });
      } else if ($("#allBgImg").prop("checked")) {
        $(".frontBg, .backBg").css({
          "background-image": "url(" + e.target.result + ")",
          "background-size": "cover",
          "background-color": "",
        });
      }
    };
    reader.readAsDataURL(src.files[0]);
  });

  $("#resizable").draggable().resizable();

  $(".CardSide").on("change", function () {
    const side = $(this).attr("id");
    if (side === "front") {
      $(".FrontSide").removeClass("d-none");
      $(".BackSide").addClass("d-none");
      $(".frontStyling").removeClass("d-none");
      $(".backStyling").addClass("d-none");
    } else if (side === "back") {
      $(".BackSide").removeClass("d-none");
      $(".FrontSide").addClass("d-none");
      $(".backStyling").removeClass("d-none");
      $(".frontStyling").addClass("d-none");
    }
  });

  $(".RotateText").on("input", function () {
    var rotationDegree = $(this).val();
    let item = "#" + $(this).attr("data");

    $(item).css("transform", "rotate(" + rotationDegree + "deg)");
  });

  $("#fontFamily").on("change", function () {
    let fontFamily = $(this).val();
    let item = "#" + $(this).attr("data");
    $(item).css("font-family", fontFamily);
  });

  $("#fontSize").on("change", function () {
    let fontSize = $(this).val();
    let item = "#" + $(this).attr("data");
    $(item).css("font-size", fontSize);
  });

  $("#boldText").on("change", function () {
    let item = "#" + $(this).attr("data");
    console.log(item);
    if ($(this).is(":checked")) {
      $(item).css("font-weight", 600);
    } else {
      $(item).css("font-weight", "normal");
    }
  });

  $("#textColor").on("input", function () {
    let textColor = $(this).val();
    let item = "#" + $(this).attr("data");
    $(item).css("color", textColor);
  });

  // Front Side start -----------------------------------------

  $(".putImage2").on("change", function () {
    var files = this.files;
    $("#imagePreviewContainer").empty();

    for (var i = 0; i < files.length; i++) {
      var reader = new FileReader();
      var image = document.createElement("img");

      reader.onload = (function (img) {
        return function (e) {
          img.src = e.target.result;
        };
      })(image);

      reader.readAsDataURL(files[i]);
      var uniqueId = "LogoImgList_" + new Date().getTime();
      image.style.width = "50px";
      image.style.height = "50px";
      image.style.objectFit = "cover";
      image.style.marginTop = "10px";
      image.style.border = "1px solid #bdbdbd";
      image.style.boxShadow = "3px 1px 5px rgba(0, 0, 0, .3)";
      image.setAttribute("id", uniqueId);
      $("#imagePreviewContainer").append(image);
    }
  });

  // $(document).on('click', '#LogoImgList', function() {
  //   var src = $(this).attr('src');
  //   var image = document.createElement('img');
  //   image.src = src;
  //   image.style.width = '200px';
  //   image.setAttribute('id', 'LogoFront');
  //   image.setAttribute('class', 'ui-widget-content bg-transparent border-0');
  //   $('.frontBg').append(image);
  //   $('#LogoFront').draggable();
  // });

  $(document).on("click", "#imagePreviewContainer img", function () {
    if (!$(this).attr("status")) {
      var src = $(this).attr("src");
      var image = document.createElement("img");
      image.src = src;
      image.style.width = "200px";
      image.style.height = "200px";
      var uniqueId = "LogoFront_" + new Date().getTime();
      image.setAttribute("id", uniqueId);
      image.setAttribute("class", "ui-widget-content bg-transparent border-0");

      $(".frontBg").append(image);
      $(this).attr("status", "used");

      $("#" + uniqueId).draggable({
        stop: function () {
          $("#FrontLogoWidth").attr("data", uniqueId);
          $("#FrontLogoHeight").attr("data", uniqueId);
          $("#FrontLogoWidth").attr("value", 200);
          $("#FrontLogoHeight").attr("value", 200);
        },
      });
    }
  });

  // $(document).on('click', '.frontBg img', function() {
  //   var Id = $(this).attr('id');
  //   var Width = $(this).width();
  //   var Height = $(this).height();

  //   $('#FrontLogoWidth').attr('data', Id);
  //   $('#FrontLogoHeight').attr('data', Id);

  //   console.log(Width);
  //   $('#FrontLogoWidth').attr('value', 200);
  //   $('#FrontLogoHeight').attr('value', 200);

  // });

  $(document).on("click", ".frontBg img", function () {
    var Id = $(this).attr("id");

    // Get the actual width and height of the image
    var boundingRect = this.getBoundingClientRect();
    var actualWidth = boundingRect.width * window.devicePixelRatio;
    var actualHeight = boundingRect.height * window.devicePixelRatio;

    $("#FrontLogoWidth").attr("data", Id);
    $("#FrontLogoHeight").attr("data", Id);

    $("#FrontLogoWidth").val(actualWidth);
    $("#FrontLogoHeight").val(actualHeight);
  });

  $("#FrontLogoWidth").on("input", function () {
    var value = $(this).val();
    var item = $(this).attr("data");
    $("#" + item).css("width", value + "px");
  });

  $("#FrontLogoHeight").on("input", function () {
    var value = $(this).val();
    var item = $(this).attr("data");
    $("#" + item).css("height", value + "px");
  });

  $("#frontBgColorCustom").on("input", function () {
    let BgColor = $(this).val();

    if ($("#frontBgColor").prop("checked")) {
      $(".frontBg").css({
        "background-image": "",
        "background-color": BgColor,
      });
    } else if ($("#backBgColor").prop("checked")) {
      $(".backBg").css({
        "background-image": "",
        "background-color": BgColor,
      });
    } else if ($("#allBgColor").prop("checked")) {
      $(".frontBg, .backBg").css({
        "background-image": "",
        "background-color": BgColor,
      });
    }
  });

  $(".color-item").on("click", function () {
    let colorItem = $(this).attr("data");

    $(".color-item").removeClass("active");
    $(this).addClass("active");

    if ($("#frontBgColor").prop("checked")) {
      $(".frontBg").css({
        "background-image": "",
        "background-color": colorItem,
      });
    } else if ($("#backBgColor").prop("checked")) {
      $(".backBg").css({
        "background-image": "",
        "background-color": colorItem,
      });
    } else if ($("#allBgColor").prop("checked")) {
      $(".frontBg, .backBg").css({
        "background-image": "",
        "background-color": colorItem,
      });
    }
  });

  $("#AddTextFront").on("click", function () {
    let textAreaValue = $(".AddCardTextFront").val();
    let uniqueId = "resizable_" + Math.random().toString(36).substr(2, 9); // Generate unique ID
    let resizableBox = $(
      '<div id="' +
        uniqueId +
        '" class="ui-widget-content z-1 position-absolute bg-transparent resizable-text" >' +
        "<p>" +
        textAreaValue +
        "</p>" +
        '<i class="las la-times close-icon"></i>' +
        "</div>"
    );
    $(".CodeRowFront").append(resizableBox);

    $("#" + uniqueId)
      .draggable({
        stop: function () {
          let item = uniqueId;
          // $('.RotateText').attr("data", item);
          $("#fontFamilyFront").attr("data", item);
          $("#fontSizeFront").attr("data", item);
          $("#boldTextFront").attr("data", item);
          $("#textColorFront").attr("data", item);
        },
      })
      .resizable();

    resizableBox.find(".close-icon").on("click", function () {
      $(this).parent(".resizable-text").remove();
    });

    resizableBox.on("click", function () {
      let item = $(this).attr("id");
      // $('.RotateText').attr("data", item);
      $("#fontFamilyFront").attr("data", item);
      $("#fontSizeFront").attr("data", item);
      $("#boldTextFront").attr("data", item);
      $("#textColorFront").attr("data", item);
    });
  });

  $("#fontFamilyFront").on("change", function () {
    let fontFamily = $(this).val();
    let item = "#" + $(this).attr("data");
    $(item).css("font-family", fontFamily);
  });

  $("#fontSizeFront").on("change", function () {
    let fontSize = $(this).val();
    let item = "#" + $(this).attr("data");
    $(item).css("font-size", fontSize);
  });

  $("#boldTextFront").on("change", function () {
    let item = "#" + $(this).attr("data");

    if ($(this).is(":checked")) {
      $(item).css("font-weight", 600);
    } else {
      $(item).css("font-weight", "normal");
    }
  });

  $("#textColorFront").on("input", function () {
    let textColor = $(this).val();
    let item = "#" + $(this).attr("data");
    $(item).css("color", textColor);
  });

  // Front Side end ------------------------------------------

  $("#AddText").on("click", function () {
    let textAreaValue = $(".AddCardText").val();
    let uniqueId = "resizable_" + Math.random().toString(36).substr(2, 9); // Generate unique ID
    let resizableBox = $(
      '<div id="' +
        uniqueId +
        '" class="ui-widget-content z-1 position-absolute bg-transparent resizable-text" >' +
        "<p>" +
        textAreaValue +
        "</p>" +
        '<i class="las la-times close-icon"></i>' +
        "</div>"
    );
    $(".CodeRow").append(resizableBox);

    $("#" + uniqueId)
      .draggable({
        stop: function () {
          let item = uniqueId;
          $(".RotateText").attr("data", item);
          $("#fontFamily").attr("data", item);
          $("#fontSize").attr("data", item);
          $("#boldText").attr("data", item);
          $("#textColor").attr("data", item);
        },
      })
      .resizable();

    resizableBox.find(".close-icon").on("click", function () {
      $(this).parent(".resizable-text").remove();
    });

    resizableBox.on("click", function () {
      let item = $(this).attr("id");
      $(".RotateText").attr("data", item);
      $("#fontFamily").attr("data", item);
      $("#fontSize").attr("data", item);
      $("#boldText").attr("data", item);
      $("#textColor").attr("data", item);
    });
  });

  // Function to set styles for top left position
  function setTopLeft() {
    const code = $(".CodeRow");
    code.empty();
    const data =
      '<div class="col-4 active "><img src="assets/images/general/card.png" id="CardCode" alt=""></div><div class="col-4 "></div><div class="col-4 "></div><div class="col-4 "></div><div class="col-4 "></div><div class="col-4 "></div><div class="col-4 "></div><div class="col-4 "></div><div class="col-4 "></div>';
    code.append($(data));
  }

  // Function to set styles for middle top position
  function setMiddleTop() {
    const code = $(".CodeRow");
    code.empty();
    const data =
      '<div class="col-4 "></div><div class="col-4 active "><img src="assets/images/general/card.png" id="CardCode" alt=""></div><div class="col-4 "></div><div class="col-4 "></div><div class="col-4 "></div><div class="col-4 "></div><div class="col-4 "></div><div class="col-4 "></div><div class="col-4 "></div>';
    code.append($(data));
  }

  // Function to set styles for top right position
  function setTopRight() {
    const code = $(".CodeRow");
    code.empty();
    const data =
      '<div class="col-4 "></div><div class="col-4 "></div><div class="col-4 active "><img src="assets/images/general/card.png" id="CardCode" alt=""></div><div class="col-4 "></div><div class="col-4 "></div><div class="col-4 "></div><div class="col-4 "></div><div class="col-4 "></div><div class="col-4 "></div>';
    code.append($(data));
  }

  // Function to set styles for left middle position
  function setLeftMiddle() {
    const code = $(".CodeRow");
    code.empty();
    const data =
      '<div class="col-4 "></div><div class="col-4 "></div><div class="col-4 "></div><div class="col-4 active  d-flex justify-content-center align-items-center"><img src="assets/images/general/card.png" id="CardCode" alt=""></div><div class="col-4 "></div><div class="col-4 "></div><div class="col-4 "></div><div class="col-4 "></div><div class="col-4 "></div>';
    code.append($(data));
  }

  // Function to set styles for center position
  function setCenter() {
    const code = $(".CodeRow");
    code.empty();
    const data =
      '<div class="col-4 "></div><div class="col-4 "></div><div class="col-4 "></div><div class="col-4 "></div><div class="col-4 active  d-flex justify-content-center align-items-center"><img src="assets/images/general/card.png" id="CardCode" alt=""></div><div class="col-4 "></div><div class="col-4 "></div><div class="col-4 "></div><div class="col-4 "></div>';
    code.append($(data));
  }

  // Function to set styles for right middle position
  function setRightMiddle() {
    const code = $(".CodeRow");
    code.empty();
    const data =
      '<div class="col-4 "></div><div class="col-4 "></div><div class="col-4 "></div><div class="col-4 "></div><div class="col-4 "></div><div class="col-4 active  d-flex justify-content-center align-items-center"><img src="assets/images/general/card.png" id="CardCode" alt=""></div><div class="col-4 "></div><div class="col-4 "></div><div class="col-4 "></div>';
    code.append($(data));
  }

  // Function to set styles for bottom left position
  function setBottomLeft() {
    const code = $(".CodeRow");
    code.empty();
    const data =
      '<div class="col-4 "></div><div class="col-4 "></div><div class="col-4 "></div><div class="col-4 "></div><div class="col-4 "></div><div class="col-4 "></div><div class="col-4 active  d-flex justify-content-center align-items-end"><img src="assets/images/general/card.png" id="CardCode" alt=""></div><div class="col-4 "></div><div class="col-4 "></div>';
    code.append($(data));
  }

  // Function to set styles for bottom center position
  function setBottomCenter() {
    const code = $(".CodeRow");
    code.empty();
    const data =
      '<div class="col-4 "></div><div class="col-4 "></div><div class="col-4 "></div><div class="col-4 "></div><div class="col-4 "></div><div class="col-4 "></div><div class="col-4 "></div><div class="col-4 active  d-flex justify-content-center align-items-end"><img src="assets/images/general/card.png" id="CardCode" alt=""></div><div class="col-4 "></div>';
    code.append($(data));
  }

  // Function to set styles for bottom right position
  function setBottomRight() {
    const code = $(".CodeRow");
    code.empty();
    const data =
      '<div class="col-4 "></div><div class="col-4 "></div><div class="col-4 "></div><div class="col-4 "></div><div class="col-4 "></div><div class="col-4 "></div><div class="col-4 "></div><div class="col-4 "></div><div class="col-4 active  d-flex justify-content-center align-items-end"><img src="assets/images/general/card.png" id="CardCode" alt=""></div>';
    code.append($(data));
  }

  // Event handlers for button clicks
  $("#topLeft").on("click", setTopLeft);
  $("#middleTop").on("click", setMiddleTop);
  $("#rightTop").on("click", setTopRight);
  $("#leftMiddle").on("click", setLeftMiddle);
  $("#Center").on("click", setCenter);
  $("#rightMiddle").on("click", setRightMiddle);
  $("#leftBottom").on("click", setBottomLeft);
  $("#bottomCenter").on("click", setBottomCenter);
  $("#rightBottom").on("click", setBottomRight);
});
