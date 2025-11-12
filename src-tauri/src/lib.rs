mod service; // 声明 api 模块

// 保持原有 greet 函数不变
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

// 保持 Tauri 入口点不变
#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![
            greet,
            service::http_request,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
