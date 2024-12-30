class QuestionGroupsController < ApplicationController
  before_action :set_question_group, only: %i[ show edit update destroy save_answers ]

  # GET /question_groups or /question_groups.json
  def index
    @question_groups = QuestionGroup.all
  end

  # GET /question_groups/1 or /question_groups/1.json
  def show
    @question = Question.new
  end

  # GET /question_groups/new
  def new
    @question_group = QuestionGroup.new
  end

  # GET /question_groups/1/edit
  def edit
  end

  # POST /question_groups or /question_groups.json
  def create
    @question_group = QuestionGroup.new(question_group_params)

    respond_to do |format|
      if @question_group.save
        format.html { redirect_to @question_group, notice: "Question group was successfully created." }
        format.json { render :show, status: :created, location: @question_group }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @question_group.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /question_groups/1 or /question_groups/1.json
  def update
    respond_to do |format|
      if @question_group.update(question_group_params)
        format.html { redirect_to @question_group, notice: "Question group was successfully updated." }
        format.json { render :show, status: :ok, location: @question_group }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @question_group.errors, status: :unprocessable_entity }
      end
    end
  end

  def save_answers
    question_params = params.dig("question_group", "question")

    @question_group.questions.each do |question|
      question.value = question_params[question.id.to_s]["value"]
      question.save
    end

    render turbo_stream: turbo_stream.replace(
        helpers.dom_id(@question_group, :questions),
        template: "questions/index",
        locals: { question_group: @question_group })
  end

  # DELETE /question_groups/1 or /question_groups/1.json
  def destroy
    @question_group.destroy!

    respond_to do |format|
      format.html { redirect_to question_groups_path, status: :see_other, notice: "Question group was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_question_group
      @question_group = QuestionGroup.find(params.expect(:id))
    end

    # Only allow a list of trusted parameters through.
    def question_group_params
      params.expect(question_group: [ :title ])
    end
end
