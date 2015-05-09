#pragma strict
public var slider : UI.Slider;
public var text : UI.Text;

function Start () {
	slider.value = TokenManager.instance().tokensPerCredit;
	text.text = TokenManager.TokensPerCreditText(false);
}

function OnSliderMoved (value : float) {
	TokenManager.instance().tokensPerCredit = parseInt(value);
	text.text = TokenManager.TokensPerCreditText(false);
}