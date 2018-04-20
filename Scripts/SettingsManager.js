#pragma strict
import UnityEngine.SceneManagement;

static var _instance : SettingsManager;
private var sceneToLoad : String;
private var cursorVisibleInGame : boolean;

public var allowExit : boolean = false;
public var exitHoldTime : float = 5;
public var exitButtonCombo : KeyCode[] = [KeyCode.Q, KeyCode.W, KeyCode.E, KeyCode.R];
private var lastExitRelease : float = -1;

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

	lastExitRelease = Time.unscaledTime;
}

function Update () {
	if ((Input.GetKeyDown(KeyCode.Alpha0) || Input.GetKeyDown(KeyCode.Keypad0)) &&
		(Input.GetKey(KeyCode.RightShift) || Input.GetKey(KeyCode.LeftShift)) &&
		(Input.GetKey(KeyCode.RightAlt) || Input.GetKey(KeyCode.LeftAlt))) {
		EnterSettings();
	}

	if (allowExit) {
		var shouldExit : boolean = true;
		for(var key : KeyCode in exitButtonCombo) {
			if (!Input.GetKey(key)) {
				shouldExit = false;
				break;
			}
		}
		if (!shouldExit) {
			lastExitRelease = Time.unscaledTime;
		}

		if ((shouldExit && exitHoldTime < 0.1) || Time.unscaledDeltaTime - lastExitRelease > exitHoldTime) {
			Debug.Log("Application Quitting");
			Application.Quit();
		}
	}
}

static function EnterSettings () {
	instance().sceneToLoad = SceneManager.GetActiveScene().name;
	instance().cursorVisibleInGame = Cursor.visible;
	Cursor.visible = true;
	SceneManager.LoadScene("CadenceSettings");
}

static function ExitSettings () {
	Cursor.visible = instance().cursorVisibleInGame;
	SceneManager.LoadScene(instance().sceneToLoad);
}