// This allows us to process/render the descriptions, which are in Markdown!
// More about Markdown: https://en.wikipedia.org/wiki/Markdown
let markdownIt = document.createElement("script");
markdownIt.src =
  "https://cdn.jsdelivr.net/npm/markdown-it@14.0.0/dist/markdown-it.min.js";
document.head.appendChild(markdownIt);

// Okay, Are.na stuff!
let channelSlug = "white-noise-oasis"; // The “slug” is just the end of the URL

// First, let’s lay out some *functions*, starting with our basic metadata:
let placeChannelInfo = (data) => {
  // Target some elements in your HTML:
  let channelTitle = document.getElementById("channel-title");
  // let channelDescription = document.getElementById('channel-description')
  let channelCount = document.getElementById("channel-count");
  let channelLink = document.getElementById("channel-link");

  // Then set their content/attributes to our data:
  channelTitle.innerHTML = data.title;
  // channelDescription.innerHTML = window.markdownit().render(data.metadata.description) // Converts Markdown → HTML
  channelCount.innerHTML = data.length;
  channelLink.href = `https://www.are.na/channel/${channelSlug}`;
};

// One sentence for every image and video, keyed by Are.na block id.
let captions = {
  26193053: "A white chrysanthemum, petals folding into layers of quiet.",
  26193049: "Backlit orchids, glowing the way a hush fills a bright room.",
  26193043: "White ripples in relief, the shape of a steady hum.",
  26193048: "A corridor of white columns that repeats until it goes silent.",
  26193045: "White arches receding, each one a little quieter than the last.",
  26193047: "Two white cups on grey, still enough to hear the room.",
  26193052: "Black ceramic vessels holding sound the way they hold air.",
  26004078: "Vertical scratches of ink, a waveform standing on end.",
  26004072: "Horizontal lines thickening into black, like static settling.",
  26004135: "A ribbon of tangled lines twisting through white, noise given a path.",
  26193051: "Night water catching the light, its sound steady underneath.",
  26193050: "Whitewater crashing, the loudest kind of white noise.",
  26003821: "A near-empty white page with faint marks, the quietest frame here.",
  26003765: "A grey wash on white, blur made visible.",
  771644: "Rows of white cubes in a white room, repetition without a beat.",
  6952909: "A keyboard cast in white plaster, every key muted.",
  26003725: "Torn layers of white paper, edges soft as a fade-out.",
  1868791: "A folded white surface creased with light, like thick paint.",
  1507021: "A white grid with blurry shadows, a window seen through fog.",
  1454407: "White paper with tiny flecks, grain you can almost hear.",
  1454406: "White concrete tiles, a wall that says nothing and means calm.",
  1457546: "Paper texture at full resolution, a whisper at 100 percent zoom.",
  3132104: "Rough white plaster, the visual grain of static.",
  6303817: "Brushed white paint, every stroke blended into one tone.",
  26003743: "Grey threads tangled across a square, noise drawn by hand.",
  26003723: "Wavy bands of scribble, sound waves drifting apart.",
  26003734: "Fine dots scattered on white, a dust of small sounds.",
  26003739: "A mountain built from thin lines, one long frequency.",
  26003730: "A cloud of grey scribble, thick in the middle and thinning out.",
  26003784: "Sparse black scratches on white, like grass or a faint crackle.",
  26003841: "A smoky grey smudge, close to the texture of burnt paper.",
  26003853: "Concentric arcs pressed into white, a sound wave frozen in plaster.",
  26003862: "Wood grain in black and white, rings recorded over years.",
  26003818: "White strands flowing on black, noise seen in the dark.",
  26004168: "A grainy ring of light on black, a speaker seen from above.",
  26004154: "A blurred NEU poster, letters vibrating like a loud room.",
  26003814: "A coral-like maze of black and white lines, endless and even.",
  26193042: "Sea foam from above, the ocean's own white noise.",
  26003839: "A halftone waveform, sound rendered as dots.",
  26003761: "Marbled swirls of grey and cream, liquid noise.",
  26003782: "Speckles on white, the picture of a quiet hiss.",
  26003689: "A soft dark orb labeled MONOCHROME, one tone, fading.",
  26003678: "Fine vertical stripes, faint as a fan in the next room.",
  6950733: "Grey carpet texture, the floor that swallows sound.",
  26003616: "A grainy gradient from white to black, the fade at the end.",
};
let captionFor = (block) =>
  captions[block.id] || block.description || block.title;

// Then our big function for specific-block-type rendering:
let renderBlock = (block) => {
  // To start, a shared `ul` where we’ll insert all our blocks
  let channelBlocks = document.getElementById("channel-blocks");
  let channelLinks = document.getElementById("channel-links");
  // Links!
  if (block.class == "Link") {
    // let linkItem =
    // `
    // <li class="block block--link">
    // 	<p><em>Link</em></p>
    // 	<picture>
    // 		<source media="(max-width: 428px)" srcset="${ block.image.thumb.url }">
    // 		<source media="(max-width: 640px)" srcset="${ block.image.large.url }">
    // 		<img src="${ block.image.original.url }">
    // 	</picture>
    // 	<h3>${ block.title }</h3>
    // 	${ block.description_html }
    // 	<p><a href="${ block.source.url }">See the original ↗</a></p>
    // 	<button id="imageButton">🔗</button>
    // </li>
    // `
    let linkItem = `
    <li class="block block--link">
      <a href="${block.source.url}">
        <img src="${block.image.original.url}">
      </a>
    </li>
    `;
    channelLinks.insertAdjacentHTML("beforeend", linkItem);
  }

  // Images!
  if (block.class == "Image") {
    let imageItem = `
				<li class="block block--image">
					<figure>
						<img src="${block.image.original.url}" alt="${block.title}">
					</figure>
					<div class="block--image__description">
						<img src="${block.image.original.url}" alt="${block.title}
							by ${block.user.full_name}">
						<p class="intro">${captionFor(block)}</p>
						<button class="close">Close</button>
					</div>
					<button id="imageButton">🖱️</button>
        </li>
        <div class="phone-block">
            <img src="${block.image.original.url}" alt="${block.title}
            by ${block.user.full_name}">
          <p class="intro">${captionFor(block)}</p>
          <button class="close">Close</button>
        </div>
				`;
    channelBlocks.insertAdjacentHTML("beforeend", imageItem);
    // …up to you!
  }

  // Text!
  else if (block.class == "Text") {
    // …up to you!
  }

  // Uploaded (not linked) media…
  else if (block.class == "Attachment") {
    let attachment = block.attachment.content_type; // Save us some repetition

    // Uploaded videos!
    if (attachment.includes("video")) {
      // …still up to you, but we’ll give you the `video` element:
      let videoItem =
        // <p><em>Video</em></p>
        `
				<li class="block block--video">
					<video src="${block.attachment.url}" playsinline preload="metadata"></video>
					<div class="block--image__description">
						<video src="${block.attachment.url}" controls playsinline></video>
						<p class="intro">${captionFor(block)}</p>
						<button class="close">Close</button>
					</div>
					<button id="imageButton">🖱️</button>
				</li>
				<div class="phone-block">
					<video src="${block.attachment.url}" controls playsinline></video>
					<p class="intro">${captionFor(block)}</p>
					<button class="close">Close</button>
				</div>
				`;
      channelBlocks.insertAdjacentHTML("beforeend", videoItem);
      // More on video, like the `autoplay` attribute:
      // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video
    }

    // Uploaded PDFs!
    else if (attachment.includes("pdf")) {
      // ${block.title || 'View PDF'}
      // <a href="${block.attachment.url}"
      // 				target="_blank
      // 				rel="noopener noreferrer">
      // 			</a>
      let pdfItem = `
				<li class="block block--pdf">
					<a href="${block.source.url}">
						<img src="${block.image.original.url}" alt="${block.title}">
					</a>
				</li>
				`;
      channelLinks.insertAdjacentHTML("beforeend", pdfItem);
      // channelBlocks.insertAdjacentHTML("beforeend", pdfItem);
      // …up to you!
    }

    // Uploaded audio!
    else if (attachment.includes("audio")) {
      // …still up to you, but here’s an `audio` element:
      let audioItem = `
				<li>
					<p><em>Audio</em></p>
					<audio controls src="${block.attachment.url}"></video>
				</li>
				`;
      channelBlocks.insertAdjacentHTML("beforeend", audioItem);
      // More on audio: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/audio
    }
  }

  // Linked media…
  else if (block.class == "Media") {
    let embed = block.embed.type;
    // Linked video!
    // ${ block.embed.html }
    if (embed.includes("video")) {
      // …still up to you, but here’s an example `iframe` element:
      let linkedVideoItem = `
				<li class="block block--media">
				<a href="${block.source.url}">
					<img src="${block.image.original.url}" alt="${block.title}">
				</a>
				</li>
				`;
      channelLinks.insertAdjacentHTML("beforeend", linkedVideoItem);
      // channelBlocks.insertAdjacentHTML("beforeend", linkedVideoItem);
      // More on iframe: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe
    }

    // Linked audio!
    else if (embed.includes("rich")) {
      // …up to you!
    }
  }
};

// It‘s always good to credit your work:
let renderUser = (user, container) => {
  // You can have multiple arguments for a function!
  // <img src="${user.avatar_image.display}"></img>
  let userAddress = `
		<address>
			<h3>${user.first_name}</h3>
			<p><a href="https://are.na/${user.slug}">Are.na profile ↗</a></p>
		</address>
		`;
  container.insertAdjacentHTML("beforeend", userAddress);
};

let addInteractivity = () => {
  let openButtons = document.querySelectorAll(".block--image #imageButton, .block--video #imageButton");
  openButtons.forEach((openButton) => {
    openButton.onclick = () => {
      let parentBlock = openButton.parentElement;
      parentBlock.classList.toggle("active");
    };
  });
  let closeButtons = document.querySelectorAll(".block--image button.close, .block--video button.close");
  let closeButton2s = document.querySelectorAll(".phone-block button.close");
  closeButtons.forEach((closeButton) => {
    closeButton.onclick = () => {
      let parentBlock = closeButton.parentElement.parentElement;
      parentBlock.classList.toggle("active");
    };
  });
  closeButton2s.forEach((closeButton) => {
    closeButton.onclick = () => {
      let parentBlock = closeButton.parentElement.previousElementSibling;
      parentBlock.classList.toggle("active");
    };
  });
  // Click on the dark backdrop (not the image/text) or press Escape to close
  let closeAll = () =>
    document
      .querySelectorAll(".block--image.active, .block--video.active")
      .forEach((block) => block.classList.remove("active"));
  document
    .querySelectorAll(".block--image__description, .phone-block")
    .forEach((overlay) => {
      overlay.onclick = (event) => {
        if (event.target === overlay) closeAll();
      };
    });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeAll();
  });
  // Videos: click the circle to play / pause
  document.querySelectorAll(".block--video > video").forEach((video) => {
    video.onclick = () => (video.paused ? video.play() : video.pause());
  });
};

// Now that we have said what we can do, go get the data:
fetch(`https://api.are.na/v2/channels/${channelSlug}?per=100`, {
  cache: "no-store",
})
  .then((response) => response.json()) // Return it as JSON data
  .then((data) => {
    // Do stuff with the data
    console.log(data); // Always good to check your response!
    placeChannelInfo(data); // Pass the data to the first function
    // Loop through the `contents` array (list), backwards. Are.na returns them in reverse!
    data.contents.reverse().forEach((block) => {
      // console.log(block) // The data for a single block
      renderBlock(block); // Pass the single block data to the render function
    });

    // Also display the owner and collaborators:
    let channelUsers = document.getElementById("channel-users"); // Show them together
    data.collaborators.forEach((collaborator) =>
      renderUser(collaborator, channelUsers)
    );
    renderUser(data.user, channelUsers);
    addInteractivity();
  });
