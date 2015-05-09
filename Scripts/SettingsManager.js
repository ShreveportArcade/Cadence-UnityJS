#pragma strict

static var _instance : SettingsManager;
private var sceneToLoad : String;
private var cursorVisibleInGame : boolean;

public static function instance() : SettingsManager {
    if (_instance == null) {
		var settingsMan = new GameObject("Cadence.SettingsManager");
		_instance = settingsMan.AddComponent(SettingsManager);
	}
	return _instance;
}

function Awake () {
	if (_instance == null) {
		_instance = this;
		DontDestroyOnLoad(_instance.gameObject);
	}
	else if (_instance != this) {
		Debug.LogWarning("SettingsManager already initialized, destroying duplicate");
		GameObject.Destroy(this);
	}
}

function Update () {
	if ((Input.GetKeyDown(KeyCode.Alpha0) || Input.GetKeyDown(KeyCode.Keypad0)) &&
		(Input.GetKey(KeyCode.RightShift) || Input.GetKey(KeyCode.LeftShift)) &&
		(Input.GetKey(KeyCode.RightAlt) || Input.GetKey(KeyCode.LeftAlt))) {
		EnterSettings();
	}
}

static function EnterSettings () {
	instance().sceneToLoad = Application.loadedLevelName;
	instance().cursorVisibleInGame = Cursor.visible;
	Cursor.visible = true;
	Application.LoadLevel("CadenceSettings");
}

static function ExitSettings () {
	Cursor.visible = instance().cursorVisibleInGame;
	Application.LoadLevel(instance().sceneToLoad);
}