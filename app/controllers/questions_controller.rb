class QuestionsController < ApplicationController
  before_action :set_question_group, only: %i[ index new edit create ]
  before_action :set_question, only: %i[ show edit update destroy ]

  # GET /questions or /questions.json
  def index
    @questions = @question_group.questions
  end

  # GET /questions/1 or /questions/1.json
  def show
  end

  # GET /questions/new
  def new
    @question = Question.new
  end

  # GET /questions/1/edit
  def edit
  end

  # POST /questions or /questions.json
  def create
    @question = Question.new(question_params)
    @question.question_group = @question_group

    
    if @question.save
      # There's a bug on form submit.  See https://github.com/hotwired/turbo/issues/1173
      render turbo_stream: turbo_stream.refresh(request_id: nil)
    else 
      
     render turbo_stream: turbo_stream.replace(helpers.dom_id(@question_group, :new_question), partial: 'questions/form', locals: { question: @question }) 
    end

    # respond_to do |format|
    #   if @question.save
    #     format.turbo_stream { render turbo_stream: { status: :no_content } }
    #     # format.html { redirect_to question_group_path(@question_group), notice: "Question was successfully created." }
    #     # format.json { render :show, status: :created, location: @question }
    #   else
    #     format.html { render :new, status: :unprocessable_entity }
    #     format.json { render json: @question.errors, status: :unprocessable_entity }
    #   end
    # end
  end

  # PATCH/PUT /questions/1 or /questions/1.json
  def update
    respond_to do |format|
      if @question.update(question_params)
        format.html { redirect_to @question, notice: "Question was successfully updated." }
        format.json { render :show, status: :ok, location: @question }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @question.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /questions/1 or /questions/1.json
  def destroy
    @question.destroy!

    # You can also refresh the turbo stream here instead of a `remove` action
    render turbo_stream: turbo_stream.remove(@question)
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_question
      @question = Question.find(params.expect(:id))
    end

    def set_question_group
      @question_group = QuestionGroup.find(params.expect(:question_group_id))
    end

    # Only allow a list of trusted parameters through.
    def question_params
      params.expect(question: [ :label, :kind, :value ])
    end
end
