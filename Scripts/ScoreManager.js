#pragma strict
import System.Collections.Generic;

public static var instance : ScoreManager;
public static var instances : Dictionary.<String, ScoreManager> = new Dictionary.<String, ScoreManager>();
public var gameKey : String = "Game";

public var defaultInitials : String = "---";
public var defaultScores : int[] = [100000, 8000, 6000, 4500, 3000, 1000];

private var _initials : String[];
public function initials() : String[] {
    return _initials;
}

private var _scores : int[];
public function scores() : int[] {
    return _scores;
}

public static function highScore() : int {
    return instance._scores[0];
}

function Awake () {
    if (instance == null) instance = this;
    InitializeScores();
    LoadHighScores();
}

function InitializeScores () {
    _initials = new String[defaultScores.Length];
    for (var i : int = 0; i < defaultScores.Length; i++) {
        _initials[i] = defaultInitials;
    }
    _scores = defaultScores.Clone() as int[];
}

public function LoadHighScores () {
    for (var i : int = 0; i < defaultScores.Length; i++) {
        _initials[i] = PlayerPrefs.GetString(gameKey + ".HighScoreName" + i, defaultInitials);
        _scores[i] = PlayerPrefs.GetInt(gameKey + ".HighScore" + i, defaultScores[i]);
    }
}

public function SaveHighScores () {
    for (var i : int = 0; i < defaultScores.Length; i++) {
        PlayerPrefs.SetString(gameKey + ".HighScoreName" + i, _initials[i]);
        PlayerPrefs.SetInt(gameKey + ".HighScore" + i, _scores[i]);
    }
    PlayerPrefs.Save();
}

public function ResetHighScores () {
    for (var i : int = 0; i < defaultScores.Length; i++) {
        PlayerPrefs.DeleteKey(gameKey + ".HighScoreName" + i);
        PlayerPrefs.DeleteKey(gameKey + ".HighScore" + i);
    }
    PlayerPrefs.Save();
    InitializeScores();
}

public function CheckHighScore (score : int) : boolean {
    for (var i : int = 0; i < defaultScores.Length; i++) {
        if (score > _scores[i]) return true;
    }
    return false;
}

public function AddHighScore (score : int, initials : String) {
    var lastScore : int = 0;
    var lastInitials : String = "";
    var highScoreSet : boolean = false;
    for (var i : int = 0; i < defaultScores.Length; i++) {
        if (score > _scores[i] || highScoreSet) {
            highScoreSet = true;
            lastScore = _scores[i];
            lastInitials = _initials[i];
            _scores[i] = score;
            _initials[i] = initials;
            score = lastScore;
            initials = lastInitials;
        }
    }
    SaveHighScores();
}