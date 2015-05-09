#pragma strict

public var sceneToLoad : String;

function ExitSettings () {
	SettingsManager.ExitSettings();
}

function Update () {
	if (Input.GetKeyDown(KeyCode.Escape)) {
		ExitSettings();
	}
}