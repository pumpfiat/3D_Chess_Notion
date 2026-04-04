export function createMenu(container, scene, camera, renderer) {
  container.innerHTML = `
    <div class="h-screen flex items-center justify-center bg-black/80">
      <div class="text-center text-white">
        <h1 class="text-7xl font-bold tracking-widest mb-8">COLOSSEUM CLASH</h1>
        <p class="text-xl mb-12">Cinematic 3D Chess</p>
        <button onclick="startGame()" 
                class="px-12 py-6 bg-red-600 hover:bg-red-700 text-2xl font-bold rounded-xl transition">
          ENTER THE ARENA
        </button>
      </div>
    </div>
  `;
}

window.startGame = function() {
  alert("Main menu coming next — we're building it step by step with AI!");
};