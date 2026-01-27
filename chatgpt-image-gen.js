// ChatGPT Image Generation Automation Script
// Run with: node chatgpt-image-gen.js

const prompts = [
  // Already done: 1-5 (Eucalyptus, Lavender, Olive, Monstera, Ginkgo)
  // Starting from prompt 6
  `Single unfurling fern frond on pure white background, dusty sage green color, generous negative space surrounding the subject, minimalist nature study, peaceful botanical simplicity, 5:7 aspect ratio, printable wall art`,
  `Layered paper cut art of forest scene, multiple depth layers in muted greens and soft cream, trees and foliage creating dimensional depth, subtle shadows between layers, handcrafted paper craft aesthetic, 5:7 aspect ratio, printable wall art`,
  `Paper cut style mountain landscape with botanical elements, overlapping layers in dusty blue and sage tones, wildflowers in foreground layer, dimensional depth effect, soft pastel color palette, 5:7 aspect ratio, printable wall art`,
  `Layered paper cut garden scene, multiple botanical silhouettes creating depth, muted terracotta coral and olive green layers, delicate ferns and flowers, handmade craft aesthetic with shadows, 5:7 aspect ratio, printable wall art`,
  `Continuous single line drawing of woman's profile with wildflowers in hair, elegant flowing unbroken line, minimal fine black line on cream background, botanical feminine art, graceful simplicity, 5:7 aspect ratio, printable wall art`,
  `One continuous line drawing of hands gently holding a small potted plant, delicate unbroken stroke on soft white background, minimalist botanical line art, tender nurturing gesture, 5:7 aspect ratio, printable wall art`,
  `Single continuous line abstract face merged with botanical leaves, elegant flowing stroke never lifting, fine black line on ivory background, artistic minimalist fusion of human and nature, 5:7 aspect ratio, printable wall art`,
  `Sumi-e ink wash bamboo stalks, traditional Japanese brush painting technique, muted grey and soft black tones on rice paper texture, minimalist zen composition, contemplative atmosphere, 5:7 aspect ratio, printable wall art`,
  `Japanese ink wash pine branch with needles, traditional sumi-e brushwork, subtle ink gradients from dark to pale grey, negative space embracing the subject, wabi-sabi aesthetic, 5:7 aspect ratio, printable wall art`,
  `Delicate sumi-e cherry blossom branch, soft grey ink wash with subtle pink undertones, traditional Japanese painting style, ethereal minimal composition, quiet contemplative mood, 5:7 aspect ratio, printable wall art`,
  `Crescent moon surrounded by circular arrangement of wildflowers and botanicals, boho celestial art, muted dusty pink blush and sage palette, mystical feminine aesthetic, soft cream background, 5:7 aspect ratio, printable wall art`,
  `Stylized sun face within circular botanical wreath, bohemian celestial design, warm terracotta and golden ochre muted tones, folk art inspired, spiritual nature aesthetic, 5:7 aspect ratio, printable wall art`,
  `Circular botanical wreath of dried flowers and eucalyptus, boho style arrangement, muted neutral palette with dusty rose and sage, organic circular frame with natural elements, 5:7 aspect ratio, printable wall art`,
  `Abstract botanical with flowing organic shapes, curved forms suggesting leaves and petals, muted terracotta and sage color palette, smooth flowing lines, modern boho organic abstraction, 5:7 aspect ratio, printable wall art`,
  `Fluid organic shapes resembling tropical leaves, soft curves and flowing forms, dusty coral and olive green palette, abstract nature-inspired composition, bohemian modern aesthetic, 5:7 aspect ratio, printable wall art`,
  `Flowing abstract plant forms with organic curves, overlapping shapes creating depth, muted mustard and sage palette, smooth flowing botanical abstraction, contemporary boho style, 5:7 aspect ratio, printable wall art`,
  `Large bold monstera leaf graphic illustration, strong clean shapes, muted deep green on cream background, modern graphic botanical poster style, striking visual impact, 5:7 aspect ratio, printable wall art`,
  `Bold graphic philodendron leaves, strong geometric simplification, flat muted sage and forest green tones, modern botanical illustration, clean crisp edges, striking composition, 5:7 aspect ratio, printable wall art`,
  `Graphic style palm frond close-up, bold simplified shapes, muted teal and dusty green palette, contemporary botanical poster design, strong visual statement, 5:7 aspect ratio, printable wall art`,
  `Wildflower silhouettes against soft gradient sky, dusty pink fading to pale blue, delicate botanical outlines, dreamy sunset meadow atmosphere, peaceful nature scene, 5:7 aspect ratio, printable wall art`,
  `Tall grass silhouettes on soft gradient background, muted peach to lavender transition, peaceful prairie at dusk, gentle botanical outlines, serene nature mood, 5:7 aspect ratio, printable wall art`,
  `Dried flowers and seed pods against gradient backdrop, soft cream to dusty rose transition, elegant botanical silhouettes, gentle autumnal atmosphere, 5:7 aspect ratio, printable wall art`,
  `Misty Nordic forest scene, tall pine trees fading into fog, muted grey and soft sage palette, ethereal atmospheric depth, Scandinavian nature aesthetic, peaceful contemplative mood, 5:7 aspect ratio, printable wall art`,
  `Foggy mountain landscape with layered ridges, soft grey and dusty blue tones, Nordic misty atmosphere, minimalist nature scene with atmospheric perspective, serene wilderness, 5:7 aspect ratio, printable wall art`,
  `Nordic lake at dawn with morning mist, subtle reflections, muted grey and pale blue palette, Scandinavian landscape atmosphere, peaceful foggy scene, tranquil nature art, 5:7 aspect ratio, printable wall art`
];

console.log(`Total prompts remaining: ${prompts.length} (prompts 6-30)`);
console.log(`\nTo use: Copy each prompt and paste into ChatGPT Images`);
console.log(`\n=== PROMPTS ===\n`);

prompts.forEach((prompt, i) => {
  console.log(`--- Prompt ${i + 6} ---`);
  console.log(prompt);
  console.log('');
});
